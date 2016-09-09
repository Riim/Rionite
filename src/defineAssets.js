import hyphenize from './Utils/hyphenize';

export default function defineAssets(component, assetsConfig) {
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (name.charAt(0) != ':') {
			let asset;

			Object.defineProperty(assets, name, {
				configurable: true,
				enumerable: true,

				get() {
					return asset || (asset = component.$(assetsConfig[name].selector || '&__' + hyphenize(name)));
				}
			});
		}
	}
}
