let { ObservableList } = require('cellx');

let olProto = ObservableList.prototype;
let _registerValue = olProto._registerValue;
let _unregisterValue = olProto._unregisterValue;
let get = olProto.get;
let set = olProto.set;
let setRange = olProto.setRange;
let _addRange = olProto._addRange;
let insertRange = olProto.insertRange;

let createObject = Object.create;

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
		this._itemsByKey = createObject(null);
		this._keyName = opts && opts.keyName || 'id';

		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_registerValue(value) {
		this._itemsByKey[value[this._keyName]] = value;
		_registerValue.call(this, value);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_unregisterValue(value) {
		delete this._itemsByKey[value[this._keyName]];
		_unregisterValue.call(this, value);
	},

	/**
	 * @typesign (values: Array);
	 */
	_validateValues(values) {
		for (let i = 0, l = values.length; i < l; i++) {
			let value = values[i];

			if (value !== Object(value)) {
				throw new TypeError('Value must be an object');
			}

			if (this._itemsByKey[value[this._keyName]]) {		
				throw new TypeError('Key of value must be unique');		
			}
		}
	},

	/**
	 * @override
	 * @typesign (key: int|string) -> *;
	 */
	get(key) {
		return typeof key == 'string' ? this._itemsByKey[key] : get.call(this, key);
	},

	/**
	 * @override
	 */
	set(index, value) {
		this._validateValues([value]);
		return set.call(this, index, value);
	},

	/**
	 * @override
	 */
	setRange(index, items) {
		this._validateValues(items);
		return setRange.call(this, index, items);
	},

	/**
	 * @override
	 */
	_addRange(items) {
		this._validateValues(items);
		_addRange.call(this, items);
	},

	/**
	 * @override
	 */
	insertRange(index, items) {
		this._validateValues(items);
		return insertRange.call(this, index, items);
	}
});

module.exports = KeyedList;
