let hyphenize = require('./utils/hyphenize');

let hasOwn = Object.prototype.hasOwnProperty;

function defineAssets(component, assetsConfig) {
	for (let name in assetsConfig) {
		if (hasOwn.call(assetsConfig, name) && name.charAt(0) != ':') {
			component[name] = component.$(assetsConfig[name].selector || '&__' + hyphenize(name));
		}
	}
}

module.exports = defineAssets;
