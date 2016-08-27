import { hasOwn } from './JS/Object';
import hyphenize from './Utils/hyphenize';

export default function defineAssets(component, assetsConfig) {
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
			assets[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
		}
	}
}
