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
		this._itemsByKey = Object.create(null);
		this._keyName = opts && opts.keyName || 'id';

		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_registerValue(value) {
		let itemsByKey = this._itemsByKey;
		let key = value[this._keyName];

		(itemsByKey[key] || (itemsByKey[key] = [])).push(value);

		_registerValue.call(this, value);
	},

	/**
	 * @override
	 * @typesign (value: Object);
	 */
	_unregisterValue(value) {
		let itemsByKey = this._itemsByKey;
		let key = value[this._keyName];
		let items = itemsByKey[key];

		items.pop();

		if (!items.length) {
			delete itemsByKey[key];
		}

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

			Object.defineProperty(value, this._keyName, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: key
			});
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
