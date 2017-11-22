import { Map } from '@riim/map-set-polyfill';

export let componentParamTypeMap = new Map<any, string>([
	[Boolean, 'boolean'],
	[Number, 'number'],
	[String, 'string'],
	[Object, 'object']
]);
