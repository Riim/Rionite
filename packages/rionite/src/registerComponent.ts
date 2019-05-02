import { kebabCase } from '@riim/kebab-case';
import { pascalize } from '@riim/pascalize';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell, EventEmitter } from 'cellx';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentConstructorMap } from './componentConstructorMap';
import { KEY_COMPONENT_PARAMS_INITED } from './ComponentParams';
import { KEY_PARAMS, KEY_PARAMS_CONFIG } from './Constants';
import { elementConstructorMap } from './elementConstructorMap';
import { ElementProtoMixin } from './ElementProtoMixin';
import { Template } from './Template';

const hasOwn = Object.prototype.hasOwnProperty;
const push = Array.prototype.push;

function inheritProperty(
	target: Record<string, any>,
	source: Record<string, any>,
	name: string,
	depth: number
) {
	let obj = target[name] as Record<string, any> | null | undefined;
	let parentObj = source[name] as Record<string, any> | null | undefined;

	if (obj && parentObj && obj != parentObj) {
		let inheritedObj: Record<string, any> = (target[name] = { __proto__: parentObj });

		for (let key in obj) {
			if (hasOwn.call(obj, key)) {
				inheritedObj[key] = obj[key];

				if (depth) {
					inheritProperty(inheritedObj, parentObj, key, depth - 1);
				}
			}
		}
	}
}

export function registerComponent(componentConstr: typeof BaseComponent) {
	let elIs = componentConstr.hasOwnProperty('elementIs')
		? componentConstr.elementIs
		: (componentConstr.elementIs = componentConstr.name);

	if (!elIs) {
		throw new TypeError('Static property "elementIs" is required');
	}

	let kebabCaseElIs = kebabCase(elIs, true);

	if (componentConstructorMap.has(kebabCaseElIs)) {
		throw new TypeError(`Component "${kebabCaseElIs}" already registered`);
	}

	let componentProto = componentConstr.prototype;
	let parentComponentConstr = Object.getPrototypeOf(componentProto)
		.constructor as typeof BaseComponent;

	inheritProperty(componentConstr, parentComponentConstr, 'params', 0);

	let paramsConfig = componentConstr.params;

	if (paramsConfig) {
		for (let name in paramsConfig) {
			if (!hasOwn.call(paramsConfig, name)) {
				continue;
			}

			let paramConfig: IComponentParamConfig = paramsConfig[name];

			if (paramConfig === null) {
				let parentParamConfig: IComponentParamConfig | null | undefined =
					parentComponentConstr.params && parentComponentConstr.params[name];

				if (parentParamConfig != null) {
					Object.defineProperty(
						componentProto,
						(typeof parentParamConfig == 'object' &&
							(parentParamConfig.type || parentParamConfig.default !== undefined) &&
							parentParamConfig.property) ||
							name,
						{
							configurable: true,
							enumerable: true,
							writable: true,
							value: null
						}
					);
				}
			} else {
				let snakeCaseName = snakeCaseAttributeName(name, true);

				let isObject =
					typeof paramConfig == 'object' &&
					(!!paramConfig.type || paramConfig.default !== undefined);

				let propertyName = (isObject && paramConfig.property) || name;

				let required: boolean;
				let readonly: boolean;

				if (isObject) {
					required = paramConfig.required || false;
					readonly = paramConfig.readonly || false;
				} else {
					required = readonly = false;
				}

				let $paramConfig: I$ComponentParamConfig = ((componentConstr.hasOwnProperty(
					KEY_PARAMS_CONFIG
				)
					? componentConstr[KEY_PARAMS_CONFIG]
					: (componentConstr[KEY_PARAMS_CONFIG] = { __proto__: null }))[
					name
				] = componentConstr[KEY_PARAMS_CONFIG][snakeCaseName] = {
					name,
					property: propertyName,

					type: undefined,
					typeSerializer: undefined,

					default: undefined,

					required,
					readonly,

					paramConfig: paramsConfig[name]
				});

				let descriptor: PropertyDescriptor;

				if (readonly) {
					descriptor = {
						configurable: true,
						enumerable: true,

						get() {
							return this[KEY_PARAMS].get(name);
						},

						set(this: BaseComponent, value: any) {
							if (this[KEY_COMPONENT_PARAMS_INITED]) {
								if (value !== this[KEY_PARAMS].get(name)) {
									throw new TypeError(`Parameter "${name}" is readonly`);
								}
							} else {
								this[KEY_PARAMS].set(name, value);
							}
						}
					};
				} else {
					Object.defineProperty(componentProto, propertyName + 'Cell', {
						configurable: true,
						enumerable: false,
						writable: true,
						value: undefined
					});

					descriptor = {
						configurable: true,
						enumerable: true,

						get() {
							let valueCell = this[propertyName + 'Cell'];

							if (valueCell) {
								return valueCell.get();
							}

							let currentlyPulling = Cell.currentlyPulling;
							let value = this[KEY_PARAMS].get(name);

							if (currentlyPulling || EventEmitter.currentlySubscribing) {
								valueCell = new Cell(value, { context: this });

								Object.defineProperty(this, propertyName + 'Cell', {
									configurable: true,
									enumerable: false,
									writable: true,
									value: valueCell
								});

								if (currentlyPulling) {
									return valueCell.get();
								}
							}

							return value;
						},

						set(this: BaseComponent, value: any) {
							if (this[KEY_COMPONENT_PARAMS_INITED]) {
								let rawValue = $paramConfig.typeSerializer!.write(
									value,
									$paramConfig.default
								);

								if (rawValue === null) {
									this.element.removeAttribute(snakeCaseName);
								} else {
									this.element.setAttribute(snakeCaseName, rawValue);
								}

								let valueCell = this[propertyName + 'Cell'];

								if (valueCell) {
									valueCell.set(value);
								} else {
									this[KEY_PARAMS].set(name, value);
								}
							} else {
								this[KEY_PARAMS].set(name, value);
							}
						}
					};
				}

				Object.defineProperty(componentProto, propertyName, descriptor);
			}
		}
	}

	inheritProperty(componentConstr, parentComponentConstr, 'i18n', 0);

	componentConstr._blockNamesString =
		elIs + ' ' + (parentComponentConstr._blockNamesString || '');

	componentConstr._elementBlockNames = [elIs];

	if (parentComponentConstr._elementBlockNames) {
		push.apply(componentConstr._elementBlockNames, parentComponentConstr._elementBlockNames);
	}

	let template = componentConstr.template;

	if (template !== null) {
		if (template === parentComponentConstr.template) {
			componentConstr.template = (template as Template).extend('', {
				blockName: elIs
			});
		} else if (template instanceof Template) {
			template.setBlockName(componentConstr._elementBlockNames);
		} else {
			componentConstr.template = parentComponentConstr.template
				? (parentComponentConstr.template as Template).extend(template, {
						blockName: elIs
				  })
				: new Template(template, { blockName: componentConstr._elementBlockNames });
		}
	}

	inheritProperty(componentConstr, parentComponentConstr, 'events', 1);
	inheritProperty(componentConstr, parentComponentConstr, 'domEvents', 1);

	let elExtends = componentConstr.elementExtends;
	let parentElConstr: typeof HTMLElement;

	if (elExtends) {
		parentElConstr =
			elementConstructorMap.get(elExtends) || window[`HTML${pascalize(elExtends)}Element`];

		if (!parentElConstr) {
			throw new TypeError(`Component "${elExtends}" is not registered`);
		}
	} else {
		parentElConstr = HTMLElement;
	}

	let elConstr = class extends parentElConstr {};

	(elConstr as any)._rioniteComponentConstructor = componentConstr;

	Object.defineProperty(elConstr, 'observedAttributes', {
		configurable: true,
		enumerable: true,

		get() {
			let paramsConfig = componentConstr.params;

			if (!paramsConfig) {
				return [];
			}

			let attrs: Array<string> = [];

			for (let name in paramsConfig) {
				if (hasOwn.call(paramsConfig, name)) {
					attrs.push(snakeCaseAttributeName(name, true));
				}
			}

			return attrs;
		}
	});

	let elProto = elConstr.prototype;

	elProto.constructor = elConstr;

	let names: Array<string | symbol> = Object.getOwnPropertyNames(ElementProtoMixin);

	for (let name of names) {
		Object.defineProperty(
			elProto,
			name,
			Object.getOwnPropertyDescriptor(ElementProtoMixin, name)!
		);
	}

	names = Object.getOwnPropertySymbols(ElementProtoMixin);

	for (let name of names) {
		Object.defineProperty(
			elProto,
			name,
			Object.getOwnPropertyDescriptor(ElementProtoMixin, name)!
		);
	}

	window.customElements.define(
		kebabCaseElIs,
		elConstr,
		elExtends ? { extends: elExtends } : undefined
	);

	componentConstructorMap.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
	elementConstructorMap.set(elIs, elConstr);

	return componentConstr;
}
