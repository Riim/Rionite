let hyphenize = require('./utils/hyphenize');

let hasOwn = Object.prototype.hasOwnProperty;

function defineAssets(component, assets) {
	for (let name in assets) {
		if (hasOwn.call(assets, name) && name.charAt(0) != ':') {
			component[name] = component.$(assets[name].selector || '&__' + hyphenize(name));
		}
	}
}

module.exports = defineAssets;
