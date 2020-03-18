import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { Cell } from 'cellx';
import { BaseComponent } from '../BaseComponent';
import { setAttribute } from '../lib/setAttribute';

const hasOwn = Object.prototype.hasOwnProperty;

export function Attr(target: BaseComponent, propName: string, _propDesc?: PropertyDescriptor): any {
	(hasOwn.call(target.constructor, 'elementAttachedHooks')
		? (target.constructor as typeof BaseComponent).elementAttachedHooks ||
		  ((target.constructor as typeof BaseComponent).elementAttachedHooks = [])
		: ((target.constructor as typeof BaseComponent).elementAttachedHooks = (
				(target.constructor as typeof BaseComponent).elementAttachedHooks || []
		  ).slice())
	).push((component: BaseComponent) => {
		let attrName = snakeCaseAttributeName(propName, true);

		setAttribute(this.element, attrName, this[propName]);

		component.listenTo(component, Cell.EVENT_CHANGE + ':' + propName, function(
			this: BaseComponent
		) {
			setAttribute(this.element, attrName, this[propName]);
		});
	});
}
