import { JS } from 'cellx';

export let componentInputTypeMap = new JS.Map<any, string>([
	[Boolean, 'boolean'],
	['boolean', 'boolean'],
	[Number, 'number'],
	['number', 'number'],
	[String, 'string'],
	['string', 'string'],
	[Object, 'object'],
	['object', 'object']
]);
