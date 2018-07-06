import { Map } from '@riim/map-set-polyfill';
import { Symbol } from '@riim/symbol-polyfill';
import { reflectConstructFeature } from './lib/Features';

export class Container {
	static _services = new Map<Function, Function>();

	static registerService(key: Function, service: Function): typeof Container {
		this._services.set(key, service);
		return this;
	}

	static get<T>(key: Function, args?: Array<any>): T {
		let service = this._services.get(key) || key;

		return (
			(service as any).$instance ||
			(reflectConstructFeature
				? Reflect.construct(service, args || [])
				: service.apply(Object.create(service.prototype), args))
		);
	}

	static reset(): typeof Container {
		this._services.clear();
		return this;
	}
}

export function Inject(
	target: Object,
	propertyName: string,
	propertyDesc?: PropertyDescriptor
): any {
	let type = (Reflect as any).getMetadata('design:type', target, propertyName);
	const KEY_INSTANCE = Symbol(`Rionite/Inject[instance:${propertyName}]`);

	return {
		configurable:
			propertyDesc && propertyDesc.configurable !== undefined
				? propertyDesc.configurable
				: true,
		enumerable:
			propertyDesc && propertyDesc.enumerable !== undefined ? propertyDesc.enumerable : true,

		get() {
			return this[KEY_INSTANCE] || (this[KEY_INSTANCE] = Container.get(type));
		}
	};
}
