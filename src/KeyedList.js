let { ObservableList } = require('cellx');

let registerValue = ObservableList.prototype._registerValue;
let unregisterValue = ObservableList.prototype._unregisterValue;
let get = ObservableList.prototype.get;

/**
 * @class Rista.KeyedList
 * @extends {cellx.ObservableList}
 *
 * @typesign new KeyedList(items?: Array|cellx.ObservableList, opts?: {
 *     adoptsItemChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean,
 *     keyName?: string
 * }) -> Rista.KeyedList;
 */
let KeyedList = ObservableList.extend({
	constructor: function KeyedList(items, opts) {
		this._itemsByKey = Object.create(null);
		this._keyName = opts && opts.keyName || 'id';

		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_registerValue(value) {
		if (typeof value != 'object') {
			throw new TypeError('Value must be an object');
		}

		let itemsByKey = this._itemsByKey;
		let key = value[this._keyName];

		if (itemsByKey[key]) {
			throw new TypeError('Key of each value must be unique');
		}

		itemsByKey[key] = value;
		registerValue.call(this, value);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_unregisterValue(value) {
		delete this._itemsByKey[value[this._keyName]];
		unregisterValue.call(this, value);
	},

	/**
	 * @override
	 * @typesign (key: int|string) -> *;
	 */
	get(key) {
		return typeof key == 'string' ? this._itemsByKey[key] : get.call(this, key);
	}
});

module.exports = KeyedList;
