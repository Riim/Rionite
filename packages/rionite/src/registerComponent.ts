import { kebabCase } from '@riim/kebab-case';
import { pascalize } from '@riim/pascalize';
import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell, EventEmitter } from 'cellx';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentConstructors } from './componentConstructors';
import { KEY_COMPONENT_PARAMS_INITED } from './ComponentParams';
import { KEY_COMPONENT_SELF, KEY_PARAM_VALUES, KEY_PARAMS_CONFIG } from './Constants';
import { elementConstructors } from './elementConstructors';
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

	if (componentConstructors.has(kebabCaseElIs)) {
		throw new TypeError(`Component "${kebabCaseElIs}" already registered`);
	}

	let componentProto = componentConstr.prototype;
	let parentComponentConstr = Object.getPrototypeOf(componentProto)
		.constructor as typeof BaseComponent;

	inheritProperty(componentConstr, parentComponentConstr, 'params', 0);

	componentConstr[KEY_PARAMS_CONFIG] = null;

	let paramsConfig = componentConstr.params;

	for (let name in paramsConfig) {
		let paramConfig: IComponentParamConfig | null = paramsConfig[name];

		if (paramConfig === null || paramConfig === Object.prototype[name]) {
			continue;
		}

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

		let $paramConfig: I$ComponentParamConfig = {
			name,
			property: propertyName,

			type: undefined,
			typeSerializer: undefined,

			default: undefined,

			required,
			readonly,

			paramConfig
		};

		(componentConstr[KEY_PARAMS_CONFIG] || (componentConstr[KEY_PARAMS_CONFIG] = new Map()))!
			.set(name, $paramConfig)
			.set(snakeCaseName, $paramConfig);

		Object.defineProperty(componentProto, propertyName + 'Cell', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: null
		});

		let descriptor = {
			configurable: true,
			enumerable: true,

			get(this: BaseComponent) {
				let self = this[KEY_COMPONENT_SELF];
				let valueCell: Cell | null = self[propertyName + 'Cell'];

				if (valueCell) {
					return valueCell.get();
				}

				let value = self[KEY_PARAM_VALUES].get(name);

				if (Cell.currentlyPulling || EventEmitter.currentlySubscribing) {
					self[KEY_PARAM_VALUES].delete(name);
					valueCell = new Cell(null, {
						context: self,
						value
					});

					Object.defineProperty(self, propertyName + 'Cell', {
						configurable: true,
						enumerable: false,
						writable: true,
						value: valueCell
					});

					if (Cell.currentlyPulling) {
						return valueCell.get();
					}
				}

				return value;
			},

			set(this: BaseComponent, value: any) {
				let self = this[KEY_COMPONENT_SELF];

				if (self[KEY_COMPONENT_PARAMS_INITED]) {
					if (readonly) {
						if (value !== self[KEY_PARAM_VALUES].get(name)) {
							throw new TypeError(`Parameter "${name}" is readonly`);
						}

						return;
					}

					let rawValue = $paramConfig.typeSerializer!.write(value, $paramConfig.default);

					if (rawValue === null) {
						self.element.removeAttribute(snakeCaseName);
					} else {
						self.element.setAttribute(snakeCaseName, rawValue);
					}
				}

				let valueCell: Cell | null = self[propertyName + 'Cell'];

				if (valueCell) {
					valueCell.set(value);
				} else {
					self[KEY_PARAM_VALUES].set(name, value);
				}
			}
		};

		Object.defineProperty(componentProto, propertyName, descriptor);
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
			elementConstructors.get(elExtends) || window[`HTML${pascalize(elExtends)}Element`];

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
			let attrs: Array<string> = [];

			for (let name in paramsConfig) {
				if (paramsConfig[name] !== null && paramsConfig[name] !== Object.prototype[name]) {
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

	componentConstructors.set(elIs, componentConstr).set(kebabCaseElIs, componentConstr);
	elementConstructors.set(elIs, elConstr);

	return componentConstr;
}
