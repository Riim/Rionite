import { NodeType, TemplateParser } from '@riim/rionite-template-parser-2';

describe('TemplateParser2', () => {
	test('элемент', () => {
		expect(
			new TemplateParser(`
				b {
					'text'
				}
			`).parse()
		).toMatchObject([[NodeType.ELEMENT, , , , 'b', , [[NodeType.TEXT, 'text']]]]);
	});
});
