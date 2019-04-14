import { templateNodeValueASTCache } from './bindContent';
import { TemplateNodeValueNodeType, TemplateNodeValueParser, TTemplateNodeValue } from './TemplateNodeValueParser';

export function getTemplateNodeValueAST(templateNodeValue: string): TTemplateNodeValue | null {
	let templateNodeValueAST = templateNodeValueASTCache[templateNodeValue];

	if (templateNodeValueAST === undefined) {
		let bracketIndex = templateNodeValue.indexOf('{');

		if (bracketIndex == -1) {
			templateNodeValueAST = templateNodeValueASTCache[templateNodeValue] = null;
		} else {
			templateNodeValueAST = new TemplateNodeValueParser(templateNodeValue).parse(
				bracketIndex
			);

			if (
				templateNodeValueAST.length == 1 &&
				templateNodeValueAST[0].nodeType == TemplateNodeValueNodeType.TEXT
			) {
				templateNodeValueAST = templateNodeValueASTCache[templateNodeValue] = null;
			} else {
				templateNodeValueASTCache[templateNodeValue] = templateNodeValueAST;
			}
		}
	}

	return templateNodeValueAST;
}
