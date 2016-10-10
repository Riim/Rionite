export default function listenAssets(component, assetsConfig) {
	let assets = component.assets;

	for (let name in assetsConfig) {
		let asset;

		if (name == ':component') {
			asset = component;
		} else if (name == ':element') {
			asset = component.element;
		}

		let assetConfig = assetsConfig[name];

		for (let key in assetConfig) {
			if (key.slice(0, 3) == 'on-' && key.length > 3) {
				if (!asset) {
					asset = assets[name];

					if (!asset) {
						break;
					}
				}

				component.listenTo(asset, key.slice(3), assetConfig[key]);
			}
		}
	}
}
