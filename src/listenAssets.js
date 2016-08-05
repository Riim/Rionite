let hasOwn = Object.prototype.hasOwnProperty;

function listenAssets(component, assetsConfig) {
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (hasOwn.call(assetsConfig, name)) {
			let asset;

			if (name == ':component') {
				asset = component;
			} else if (name == ':element') {
				asset = component.element;
			} else {
				asset = assets[name];

				if (!asset) {
					continue;
				}
			}

			let assetConfig = assetsConfig[name];

			for (let key in assetConfig) {
				if (hasOwn.call(assetConfig, key) && key.length > 3 && key.slice(0, 3) == 'on-') {
					component.listenTo(asset, key.slice(3), assetConfig[key]);
				}
			}
		}
	}
}

module.exports = listenAssets;
