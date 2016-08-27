import { toString } from '../JS/Object';

export default function isRegExp(value: any): boolean {
	return toString.call(value) == '[object RegExp]';
}
