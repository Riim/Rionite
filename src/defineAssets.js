let hyphenize = require('./utils/hyphenize');

let hasOwn = Object.prototype.hasOwnProperty;

function defineAssets(component, assetsConfig) {
	let assets = component.assets;

	for (let name in assetsConfig) {
		if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
			assets[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
		}
	}
}

module.exports = defineAssets;
