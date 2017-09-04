import { nextUID } from '@riim/next-uid';
import { Symbol } from '@riim/symbol-polyfill';

let hasOwn = Object.prototype.hasOwnProperty;

let KEY_UID = Symbol('uid');

export let getUID: (obj: { [name: string]: any }) => string;

if (typeof KEY_UID == 'symbol') {
	getUID = function getUID(obj) {
		return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
	};
} else {
	getUID = function getUID(obj) {
		if (!hasOwn.call(obj, KEY_UID)) {
			Object.defineProperty(obj, KEY_UID, { value: nextUID() });
		}

		return obj[KEY_UID];
	};
}
