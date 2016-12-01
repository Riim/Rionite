import { JS, Utils } from 'cellx';

let nextUID = Utils.nextUID;

let hasOwn = Object.prototype.hasOwnProperty;

let KEY_UID = JS.Symbol('uid');
let getUID: (obj: Object) => string;

if (typeof KEY_UID == 'symbol') {
	getUID = function getUID(obj) {
		return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : (obj[KEY_UID] = nextUID());
	};
} else {
	getUID = function getUID(obj) {
		return hasOwn.call(obj, KEY_UID) ? obj[KEY_UID] : Object.defineProperty(obj, (KEY_UID as any), {});
	};
}

export default getUID;
