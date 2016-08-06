let { ObservableMap } = require('cellx');
let IndexedCollectionMixin = require('./IndexedCollectionMixin');

let { contains, get } = ObservableMap.prototype;

/**
 * @class Rionite.IndexedMap
 * @extends {cellx.ObservableMap}
 * @implements {Rionite.IndexedCollectionMixin}
 *
 * @typesign new IndexedMap(entries?: Object|cellx.ObservableMap|Map|Array<{ 0, 1 }>, opts?: {
 *     adoptsItemChanges?: boolean,
 *     indexes?: Array<string|{ keyName: string, keyGenerator?: () -> string }>
 * }) -> Rionite.IndexedMap;
 */
let IndexedMap = ObservableMap.extend({
	Implements: [IndexedCollectionMixin],

	constructor: function IndexedMap(items, opts) {
		IndexedCollectionMixin.call(this, opts);
		ObservableMap.call(this, items, opts);
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
	 * @typesign (key) -> *;
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

module.exports = IndexedMap;
