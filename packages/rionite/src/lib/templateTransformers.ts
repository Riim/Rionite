import { NodeType, Template } from '../Template2';

[
	['IfThen', 'rn-if-then'],
	['IfElse', 'rn-if-else'],
	['Repeat', 'rn-repeat']
].forEach(([name, is]) => {
	Template.elementTransformers[name] = el => {
		return [
			{
				nodeType: NodeType.ELEMENT,
				isTransformer: false,
				namespaceSVG: el.namespaceSVG,
				tagName: 'template',
				is,
				names: el.names,
				attributes: el.attributes,
				$specifiedParams: null,
				events: null,
				domEvents: null,
				content: el.content,
				contentTemplateIndex: null
			}
		];
	};
});

[
	['if', 'rn-if-then'],
	['unless', 'rn-if-else'],
	['for', 'rn-repeat']
].forEach(([name, is]) => {
	Template.attributeTransformers[name] = (el, attr) => {
		return {
			nodeType: NodeType.ELEMENT,
			isTransformer: false,
			namespaceSVG: false,
			tagName: 'template',
			is,
			names: null,
			attributes: {
				attributeIsValue: is,
				list: {
					0: {
						isTransformer: false,
						name: name == 'unless' ? 'if' : name,
						value: attr.value,
						pos: -1
					},
					'length=': 1
				}
			},
			$specifiedParams: null,
			events: null,
			domEvents: null,
			content: [el],
			contentTemplateIndex: null
		};
	};
});
