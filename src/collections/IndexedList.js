let { ObservableList } = require('cellx');
let IndexedCollectionMixin = require('./IndexedCollectionMixin');

let { contains, get } = ObservableList.prototype;

/**
 * @class Rionite.IndexedList
 * @extends {cellx.ObservableList}
 * @implements {Rionite.IndexedCollectionMixin}
 *
 * @typesign new IndexedList(items?: Array|cellx.ObservableList, opts?: {
 *     adoptsItemChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean,
 *     indexes?: Array<string|{ keyName: string, keyGenerator?: () -> string }>
 * }) -> Rionite.IndexedList;
 */
let IndexedList = ObservableList.extend({
	Implements: [IndexedCollectionMixin],

	constructor: function IndexedList(items, opts) {
		IndexedCollectionMixin.call(this, opts);
		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 * @typesign (value) -> boolean;
	 * @typesign (key, keyName?: string) -> boolean;
	 */
	contains(key, keyName) {
		if (arguments.length >= 2) {
			let index = this._indexes[keyName];
			return index ? index.has(key) : false;
		}

		return contains.call(this, key);
	},

	/**
	 * @override
	 * @typesign (index: int) -> *;
	 * @typesign (key, keyName?: string) -> *;
	 */
	get(key, keyName) {
		if (arguments.length >= 2) {
			let index = this._indexes[keyName];

			if (index) {
				let items = index.get(key);
				return items && items[items.length - 1];
			}

			return void 0;
		}

		return get.call(this, key);
	}
});

module.exports = IndexedList;
