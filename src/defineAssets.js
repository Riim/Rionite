import { KEY_MARKUP_BLOCK_NAMES, KEY_ASSET_CLASS_NAMES } from './keys';
import hyphenize from './Utils/hyphenize';

export default function defineAssets(component, assetsConfig) {
	let constr = component.constructor;
	let markupBlockNames = constr[KEY_MARKUP_BLOCK_NAMES];
	let assetClassNames = constr[KEY_ASSET_CLASS_NAMES];
	let el = component.element;
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (name.charAt(0) != ':') {
			let asset;

			Object.defineProperty(assets, name, {
				configurable: true,
				enumerable: true,

				get() {
					if (asset === void 0) {
						let className = assetClassNames[name];

						if (className) {
							let assetEl = el.getElementsByClassName(className)[0];
							asset = assetEl ? assetEl.$c || assetEl : null;
						} else {
							let selector = assetsConfig[name].selector;

							if (selector) {
								asset = component.$(selector);
							} else {
								let nameWithDelim = '__' + hyphenize(name);
								let assetEl;

								for (let i = markupBlockNames.length; i;) {
									className = markupBlockNames[--i] + nameWithDelim;
									assetEl = el.getElementsByClassName(className)[0];

									if (assetEl) {
										assetClassNames[name] = className;
										break;
									}
								}

								asset = assetEl ? assetEl.$c || assetEl : null;
							}
						}
					}

					return asset;
				}
			});
		}
	}
}
