import { BaseComponent } from '../BaseComponent';

export function Ref(target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void;
export function Ref(
	name?: string
): (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor) => void;
export function Ref(
	target?: BaseComponent | string,
	propName?: string,
	_propDesc?: PropertyDescriptor,
	name?: string
): any {
	if (!propName) {
		return (target: BaseComponent, propName: string, propDesc?: PropertyDescriptor): void =>
			(Ref as any)(target, propName, propDesc, name);
	}

	if (!name) {
		name = propName;
	}

	let lifecycleHooks = Object.prototype.hasOwnProperty.call(
		target!.constructor,
		'_lifecycleHooks'
	)
		? (target!.constructor as typeof BaseComponent)._lifecycleHooks
		: ((target!.constructor as typeof BaseComponent)._lifecycleHooks = ({
				__proto__: (target!.constructor as typeof BaseComponent)._lifecycleHooks
		  } as any) as typeof BaseComponent._lifecycleHooks);

	(Object.prototype.hasOwnProperty.call(lifecycleHooks, 'ready')
		? lifecycleHooks.ready
		: (lifecycleHooks.ready = lifecycleHooks.ready.slice())
	).push((component: BaseComponent) => {
		component[propName] = component.$(name!);
	});
}
