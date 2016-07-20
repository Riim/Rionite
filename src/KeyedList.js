let { ObservableList, utils: { nextUID } } = require('cellx');

let {
	_registerValue,
	_unregisterValue,
	get,
	set,
	setRange,
	add,
	_addRange,
	insert,
	insertRange
} = ObservableList.prototype;

let createObject = Object.create;
let defineProperty = Object.defineProperty;

/**
 * @class Rionite.KeyedList
 * @extends {cellx.ObservableList}
 *
 * @typesign new KeyedList(items?: Array|cellx.ObservableList, opts?: {
 *     adoptsItemChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean,
 *     keyName?: string
 * }) -> Rionite.KeyedList;
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
	_checkValues(values) {
		for (let i = 0, l = values.length; i < l; i++) {
			this._checkValue(values[i]);
		}
	},

	/**
	 * @typesign (value);
	 */
	_checkValue(value) {
		if (value !== Object(value)) {
			throw new TypeError('Value must be an object');
		}

		let key = value[this._keyName];

		if (key == null) {
			do {
				key = nextUID();
			} while (this._itemsByKey[key]);

			defineProperty(value, this._keyName, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: key
			});
		} else if (this._itemsByKey[key]) {		
			throw new TypeError('Key of value must be unique');		
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
		this._checkValue(value);
		return set.call(this, index, value);
	},

	/**
	 * @override
	 */
	setRange(index, values) {
		this._checkValues(values);
		return setRange.call(this, index, values);
	},

	/**
	 * @override
	 */
	add(item) {
		this._checkValue(item);
		return add.call(this, item);
	},

	/**
	 * @override
	 */
	_addRange(items) {
		this._checkValues(items);
		_addRange.call(this, items);
	},

	/**
	 * @override
	 */
	insert(index, item) {
		this._checkValue(item);
		return insert.call(this, index, item);
	},

	/**
	 * @override
	 */
	insertRange(index, items) {
		this._checkValues(items);
		return insertRange.call(this, index, items);
	}
});

module.exports = KeyedList;
