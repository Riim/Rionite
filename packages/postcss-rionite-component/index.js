const postcss = require('postcss');
const { snakeCaseAttributeName } = require('@riim/rionite-snake-case-attribute-name');

const COMPONENT = 'component';
const ELEMENT = 'el';
const MODIFIER = 'mod';

const reComponentParams = /(?:(?:^|\s*:)\s*[a-z][\-_0-9a-z]*)+\s*$/i;
const reElementParams = /(?:(?:^|\s*,)\s*[a-z][\-_0-9a-z]*)+\s*$/i;
const reModifierParams = /^(?:(?:^|\s*,)\s*[a-z][\-_0-9a-z]*(?:=[\-_0-9a-z]*)?)+\s*$/i;

function createCallback(parentAtRuleName, parentRule, componentName) {
	return atRule => {
		let atRuleName = atRule.name;

		if (atRuleName != ELEMENT && atRuleName != MODIFIER) {
			return;
		}

		if (!(atRuleName == ELEMENT ? reElementParams : reModifierParams).test(atRule.params)) {
			return;
		}

		let rule = new postcss.rule({
			selector: atRule.params
				.split(',')
				.map(
					atRuleName == ELEMENT
						? elName => `& .${componentName}__${elName.trim()}`
						: modifier =>
								`&[${modifier
									.trim()
									.replace(/^[^=]+/, name => snakeCaseAttributeName(name, true))
									.replace(/=(\d+)$/, "='$1'")}]`
				)
				.join(',\n')
		});

		while (atRule.first) {
			rule.append(atRule.first);
		}

		atRule.replaceWith(rule);

		rule.walkAtRules(createCallback(atRuleName, rule, componentName));
	};
}

module.exports = postcss.plugin('postcss-rionite-component', () => {
	return root => {
		root.walkAtRules('component', componentAtRule => {
			if (componentAtRule.parent != root || !reComponentParams.test(componentAtRule.params)) {
				return;
			}

			let componentNames = componentAtRule.params
				.split(':')
				.map(componentName => componentName.trim());
			let rule = new postcss.rule({ selector: '.' + componentNames.join('.') });

			while (componentAtRule.first) {
				rule.append(componentAtRule.first);
			}

			componentAtRule.replaceWith(rule);

			rule.walkAtRules(
				createCallback(
					componentAtRule.name,
					rule,
					componentNames[componentNames.length - 1]
				)
			);
		});
	};
});
