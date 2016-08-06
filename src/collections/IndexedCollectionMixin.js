let { ObservableCollectionMixin, js: { Map }, utils: { nextUID } } = require('cellx');

let { _registerValue, _unregisterValue } = ObservableCollectionMixin.prototype;

let IndexedCollectionMixin = ObservableCollectionMixin.extend({
	constructor: function IndexedCollectionMixin(opts) {
		this._indexesConfig = opts && opts.indexes ?
			opts.indexes.map(indexConfig => typeof indexConfig == 'string' ? { keyName: indexConfig } : indexConfig) :
			[{ keyName: 'id', keyGenerator: nextUID }];

		this._indexes = Object.create(null);
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
	}
});

module.exports = IndexedCollectionMixin;
