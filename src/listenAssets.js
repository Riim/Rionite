let hasOwn = Object.prototype.hasOwnProperty;

function listenAssets(component, assets) {
	for (let name in assets) {
		if (hasOwn.call(assets, name)) {
			let asset = name == ':host' ?
				component :
				(name == ':element' ? component.element : component[name]);
			let config = assets[name];

			for (let key in config) {
				if (hasOwn.call(config, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
					component.listenTo(asset, key.slice(3), config[key]);
				}
			}
		}
	}
}

module.exports = listenAssets;
