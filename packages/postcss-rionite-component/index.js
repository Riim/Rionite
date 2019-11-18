const postcss = require('postcss');
const postcssNested = require('postcss-nested');
const { snakeCaseAttributeName } = require('@riim/rionite-snake-case-attribute-name');
// const { escapeRegExp } = require('@riim/escape-regexp');

const COMPONENT = 'component';
const ELEMENT = 'el';
const MODIFIER = 'mod';

const reComponentParams = /^\s*(?:[a-z][\-_0-9a-z]*\s*(?::\s*|$))+/i;
const reElementParams = /^\s*(?:[a-z][\-_0-9a-z]*\s*(?:,\s*|$))+/i;
const reModifierParams = /^\s*(?:(?:not\s+)?[a-z][\-_0-9a-z]*(?:=[\-_0-9a-z]*)?\s*(?:,\s*|$))+/i;

function createWalkAtRulesCallback(_topAtRuleName, componentName) {
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
						: (modifier: string) => {
								modifier = modifier.trim();

								let notMode = false;

								if (/^not\s/i.test(modifier)) {
									modifier = modifier.slice(4).trimStart();
									notMode = true;
								}

								return (
									(notMode ? '&:not([' : '&[') +
									modifier
										.replace(/^[^=]+/, name =>
											snakeCaseAttributeName(name, true)
										)
										.replace(/=(\d+)$/, "='$1'") +
									(notMode ? '])' : ']')
								);
						  }
				)
				.join(',\n')
		});

		while (atRule.first) {
			rule.append(atRule.first);
		}

		atRule.replaceWith(rule);

		rule.walkAtRules(createWalkAtRulesCallback(atRuleName, componentName));
	};
}

module.exports = postcss.plugin('postcss-rionite-component', opts => {
	return root => {
		let componentNames;
		let componentSelector;

		root.walkAtRules(COMPONENT, atRule => {
			if (atRule.parent != root || !reComponentParams.test(atRule.params)) {
				return;
			}

			componentNames = atRule.params.split(':').map(componentName => componentName.trim());
			componentSelector = '.' + componentNames.join('.');
			let rule = new postcss.rule({ selector: componentSelector });

			while (atRule.first) {
				rule.append(atRule.first);
			}

			atRule.replaceWith(rule);

			rule.walkAtRules(
				createWalkAtRulesCallback(atRule.name, componentNames[componentNames.length - 1])
			);
		});

		postcssNested.postcss(root, opts);

		// if (!componentNames) {
		// 	return;
		// }

		// root.walkRules(
		// 	RegExp(
		// 		`^${escapeRegExp(componentSelector)} .${escapeRegExp(
		// 			componentNames[componentNames.length - 1]
		// 		)}__`
		// 	),
		// 	rule => {
		// 		let newRule = new postcss.rule({
		// 			selectors: rule.selectors.map(selector =>
		// 				componentNames.length == 1
		// 					? selector.slice(1 + componentNames[0].length + 1)
		// 					: selector.slice(0, 1 + componentNames.slice(0, -1).join('.').length) +
		// 					  selector.slice(1 + componentNames.join('.').length)
		// 			)
		// 		});

		// 		while (rule.first) {
		// 			newRule.append(rule.first);
		// 		}

		// 		rule.replaceWith(newRule);
		// 	}
		// );
	};
});
