import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell } from 'cellx';
import { BaseComponent } from '../BaseComponent';
import { setAttribute } from '../lib/setAttribute';

export function Attr(target: BaseComponent, propName: string, _propDesc?: PropertyDescriptor): any {
	let lifecycleHooks = Object.prototype.hasOwnProperty.call(target.constructor, '_lifecycleHooks')
		? (target.constructor as typeof BaseComponent)._lifecycleHooks
		: ((target.constructor as typeof BaseComponent)._lifecycleHooks = ({
				__proto__: (target.constructor as typeof BaseComponent)._lifecycleHooks
		  } as any) as typeof BaseComponent._lifecycleHooks);

	(Object.prototype.hasOwnProperty.call(lifecycleHooks, 'connected')
		? lifecycleHooks.connected
		: (lifecycleHooks.connected = lifecycleHooks.connected.slice())
	).push((component: BaseComponent) => {
		let attrName = snakeCaseAttributeName(propName, true);

		setAttribute(component.element, attrName, component[propName]);

		component.listenTo(component, Cell.EVENT_CHANGE + ':' + propName, function (
			this: BaseComponent
		) {
			setAttribute(this.element, attrName, this[propName]);
		});
	});
}
