let uidCounter = 0;

/**
 * @typesign (): string;
 */
function nextUID() {
	return String(++uidCounter);
}

let KEY_UID = '__rista_uid__';
if (window.Symbol && typeof Symbol.iterator == 'symbol') {
	KEY_UID = Symbol(KEY_UID);
}

/**
 * @typesign (obj: Object): string;
 */
function getUID(obj) {
	return obj[KEY_UID] || Object.defineProperty(obj, KEY_UID, { value: nextUID() })[KEY_UID];
}

module.exports = {
	next: nextUID,
	get: getUID
};
