import { templateNodeValueASTCache } from './bindContent';
import { TemplateNodeValueNodeType, TemplateNodeValueParser, TTemplateNodeValueAST } from './TemplateNodeValueParser';

export function parseTemplateNodeValue(templateNodeValue: string): TTemplateNodeValueAST | null {
	if (!templateNodeValueASTCache.has(templateNodeValue)) {
		let bracketIndex = templateNodeValue.indexOf('{');

		if (bracketIndex == -1) {
			templateNodeValueASTCache.set(templateNodeValue, null);
		} else {
			let templateNodeValueAST: TTemplateNodeValueAST | null = new TemplateNodeValueParser(
				templateNodeValue
			).parse(bracketIndex);

			if (
				templateNodeValueAST.length == 1 &&
				templateNodeValueAST[0].nodeType == TemplateNodeValueNodeType.TEXT
			) {
				templateNodeValueAST = null;
			}

			templateNodeValueASTCache.set(templateNodeValue, templateNodeValueAST);
		}
	}

	return templateNodeValueASTCache.get(templateNodeValue)!;
}
