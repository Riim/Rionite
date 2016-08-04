let { ObservableList, utils: { nextUID } } = require('cellx');

let { _registerValue, _unregisterValue, get } = ObservableList.prototype;

/**
 * @class Rionite.IndexedList
 * @extends {cellx.ObservableList}
 *
 * @typesign new IndexedList(items?: Array|cellx.ObservableList, opts?: {
 *     adoptsItemChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean,
 *     keyIndexes?: Array<string|{ keyName: string, keyGenerator?: () -> string }>
 * }) -> Rionite.IndexedList;
 */
let IndexedList = ObservableList.extend({
	constructor: function IndexedList(items, opts) {
		this._keyIndexesConfig = opts && opts.keyIndexes ?
			opts.keyIndexes.map(
				keyIndexConfig => typeof keyIndexConfig == 'string' ? { keyName: keyIndexConfig } : keyIndexConfig
			) :
			[{ keyName: 'id', keyGenerator: nextUID }];

		this._keyIndexes = Object.create(null);

		ObservableList.call(this, items, opts);
	},

	/**
	 * @override
	 */
	_registerValue(value) {
		if (value === Object(value)) {
			let keyIndexesConfig = this._keyIndexesConfig;
			let keyIndexes = this._keyIndexes;

			for (let i = keyIndexesConfig.length; i;) {
				let keyIndexConfig = keyIndexesConfig[--i];
				let keyName = keyIndexConfig.keyName;
				let keyIndex = keyIndexes[keyName] || (keyIndexes[keyName] = Object.create(null));
				let key = value[keyName];

				if (key == null) {
					let keyGenerator = keyIndexConfig.keyGenerator;

					if (keyGenerator) {
						do {
							key = keyGenerator();
						} while (keyIndex[key]);

						Object.defineProperty(value, keyName, {
							configurable: false,
							enumerable: false,
							writable: false,
							value: key
						});
					}
				}

				if (key != null) {
					(keyIndex[key] || (keyIndex[key] = [])).push(value);
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
			let keyIndexesConfig = this._keyIndexesConfig;
			let keyIndexes = this._keyIndexes;

			for (let i = keyIndexesConfig.length; i;) {
				let keyName = keyIndexesConfig[--i].keyName;
				let key = value[keyName];

				if (key != null) {
					let keyIndex = keyIndexes[keyName];
					let items = keyIndex[key];

					items.pop();

					if (!items.length) {
						delete keyIndex[key];
					}
				}
			}
		}

		_unregisterValue.call(this, value);
	},

	/**
	 * @override
	 * @typesign (index: int) -> *;
	 * @typesign (key: string, keyName?: string) -> *;
	 */
	get(key, keyName) {
		if (keyName !== void 0) {
			let keyIndex = this._keyIndexes[keyName];

			if (!keyIndex) {
				return void 0;
			}

			let items = keyIndex[key];
			return items && items[items.length - 1];
		}

		return get.call(this, key);
	}
});

module.exports = IndexedList;
