import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell } from 'cellx';
import { BaseComponent } from '../BaseComponent';
import { setAttribute } from '../lib/setAttribute';

const hasOwn = Object.prototype.hasOwnProperty;

export function Attr(target: BaseComponent, propName: string, _propDesc?: PropertyDescriptor): any {
	let lifecycleHooks = hasOwn.call(target.constructor, '_lifecycleHooks')
		? (target.constructor as typeof BaseComponent)._lifecycleHooks
		: ((target.constructor as typeof BaseComponent)._lifecycleHooks = ({
				__proto__: (target.constructor as typeof BaseComponent)._lifecycleHooks
		  } as any) as typeof BaseComponent._lifecycleHooks);

	(hasOwn.call(lifecycleHooks, 'connected')
		? lifecycleHooks.connected
		: (lifecycleHooks.connected = lifecycleHooks.connected.slice())
	).push((component: BaseComponent) => {
		let attrName = snakeCaseAttributeName(propName, true);

		setAttribute(this.element, attrName, this[propName]);

		component.listenTo(component, Cell.EVENT_CHANGE + ':' + propName, function (
			this: BaseComponent
		) {
			setAttribute(this.element, attrName, this[propName]);
		});
	});
}
