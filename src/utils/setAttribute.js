function setAttribute(el, name, value) {
	if (value === false || value == null) {
		el.removeAttribute(name);
	} else {
		el.setAttribute(name, value === true ? '' : value);
	}
}

module.exports = setAttribute;
