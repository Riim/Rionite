/**
 * @typesign (rules: CSSRuleList, sheet: CSSStyleSheet, prefix: string|Array<string>);
 */
function scopeRules(rules, sheet, prefix) {
	if (!Array.isArray(prefix)) {
		prefix = [prefix];
	}

	for (let i = rules.length; i;) {
		let rule = rules[--i];

		if (rule.type == 1) {
			let cssText = rule.style.cssText;

			if (cssText) {
				let selector = prefix.map(prefix => {
					return prefix + (' ' + rule.selectorText.split(',').join(`, ${prefix} `))
						.replace(/\x20+:root/gi, '');
				}).join(', ');

				sheet.deleteRule(i);
				sheet.insertRule(`${selector} { ${cssText} }`, i);
			}
		} else if (rule.cssRules) {
			scopeRules(rule.cssRules, rule, prefix);
		}
	}
}

/**
 * @typesign (styleEl: HTMLStyleElement, prefix: string|Array<string>);
 */
function scopeStyles(styleEl, prefix) {
	scopeRules(styleEl.sheet.cssRules, styleEl.sheet, prefix);
}

/**
 * @typesign (styles: string, prefix: string|Array<string>): HTMLStyleElement;
 */
function addScopedStyles(styles, prefix) {
	let styleEl = document.createElement('style');
	styleEl.setAttribute('type', 'text/css');
	styleEl.textContent = styles;

	document.head.appendChild(styleEl);

	scopeStyles(styleEl, prefix);

	return styleEl;
}

module.exports = addScopedStyles;
