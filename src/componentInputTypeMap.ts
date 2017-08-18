import { Map } from '@riim/map-set-polyfill';

export let componentInputTypeMap = new Map<any, string>([
	[Boolean, 'boolean'],
	['boolean', 'boolean'],
	[Number, 'number'],
	['number', 'number'],
	[String, 'string'],
	['string', 'string'],
	[Object, 'object'],
	['object', 'object']
]);
