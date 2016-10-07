import { KEY_MARKUP_BLOCK_NAMES } from './keys';
import hyphenize from './Utils/hyphenize';

export default function defineAssets(component, assetsConfig) {
	let markupBlockNames = component.constructor[KEY_MARKUP_BLOCK_NAMES];
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (name.charAt(0) != ':') {
			let asset;

			Object.defineProperty(assets, name, {
				configurable: true,
				enumerable: true,

				get() {
					if (asset === void 0) {
						let selector = assetsConfig[name].selector;

						if (selector) {
							asset = component.$(selector);
						} else {
							let nameWithDelim = '__' + hyphenize(name);
							let el = component.element.getElementsByClassName(markupBlockNames[0] + nameWithDelim)[0];

							if (!el) {
								for (let i = 1, l = markupBlockNames.length; i < l; i++) {
									el = component.element
										.getElementsByClassName(markupBlockNames[i] + nameWithDelim)[0];

									if (el) {
										break;
									}
								}
							}

							asset = el ? el.$c || el : null;
						}
					}

					return asset;
				}
			});
		}
	}
}
