let { ObservableList, js: { Map }, utils: { nextUID } } = require('cellx');

let { _registerValue, _unregisterValue, contains, get } = ObservableList.prototype;

/**
 * @class Rionite.IndexedList
 * @extends {cellx.ObservableList}
 *
 * @typesign new IndexedList(items?: Array|cellx.ObservableList, opts?: {
 *     adoptsItemChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean,
 *     indexes?: Array<string|{ keyName: string, keyGenerator?: () -> string }>
 * }) -> Rionite.IndexedList;
 */
let IndexedList = ObservableList.extend({
	constructor: function IndexedList(items, opts) {
		this._indexesConfig = opts && opts.indexes ?
			opts.indexes.map(indexConfig => typeof indexConfig == 'string' ? { keyName: indexConfig } : indexConfig) :
			[{ keyName: 'id', keyGenerator: nextUID }];

		this._indexes = Object.create(null);

		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 */
	_registerValue(value) {
		if (value === Object(value)) {
			let indexesConfig = this._indexesConfig;
			let indexes = this._indexes;

			for (let i = indexesConfig.length; i;) {
				let indexConfig = indexesConfig[--i];
				let keyName = indexConfig.keyName;
				let index = indexes[keyName] || (indexes[keyName] = new Map());
				let key = value[keyName];

				if (key == null) {
					let keyGenerator = indexConfig.keyGenerator;

					if (keyGenerator) {
						do {
							key = keyGenerator();
						} while (index.has(key));

						Object.defineProperty(value, keyName, {
							configurable: false,
							enumerable: false,
							writable: false,
							value: key
						});
					}
				}

				if (key != null) {
					let items = index.get(key);

					if (items) {
						items.push(value);
					} else {
						index.set(key, [value]);
					}
				}
			}
		}

		_registerValue.call(this, value);
	},

	/**
	 * @override
	 */
	_unregisterValue(value) {
		if (value === Object(value)) {
			let indexesConfig = this._indexesConfig;
			let indexes = this._indexes;

			for (let i = indexesConfig.length; i;) {
				let keyName = indexesConfig[--i].keyName;
				let key = value[keyName];

				if (key != null) {
					let index = indexes[keyName];
					let items = index.get(key);

					if (items.length == 1) {
						index.delete(key);
					} else {
						items.pop();
					}
				}
			}
		}

		_unregisterValue.call(this, value);
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
