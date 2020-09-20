import { NodeType, Template } from '../Template2';

[
	['cond', 'rn-condition'],
	['repeat', 'rn-repeat']
].forEach(([name, is]) => {
	Template.elementTransformers[name] = (el) => [
		{
			nodeType: NodeType.ELEMENT,
			names: el.names,
			isTransformer: false,
			namespaceSVG: el.namespaceSVG,
			tagName: 'template',
			is,
			attributes: el.attributes,
			$specifiedParams: null,
			events: null,
			domEvents: null,
			content: el.content,
			contentTemplateIndex: null
		}
	];
});

// ['if', 'unless'].forEach((name) => {
// 	Template.elementTransformers[name] = (el) => [
// 		{
// 			nodeType: NodeType.ELEMENT,
// 			names: el.names,
// 			isTransformer: false,
// 			namespaceSVG: el.namespaceSVG,
// 			tagName: 'template',
// 			is: 'rn-condition',
// 			attributes: {
// 				attributeIsValue: 'rn-condition',
// 				list: {
// 					[name]: 0 as any,
// 					0: {
// 						isTransformer: false,
// 						name,
// 						value: el.attributes!.list![0].name
// 					},
// 					'length=': 1
// 				}
// 			},
// 			$specifiedParams: null,
// 			events: null,
// 			domEvents: null,
// 			content: el.content,
// 			contentTemplateIndex: null
// 		}
// 	];
// });

[
	['if', 'rn-condition'],
	['unless', 'rn-condition'],
	['for', 'rn-repeat']
].forEach(([name, is]) => {
	Template.attributeTransformers[name] = (el, attr) => ({
		nodeType: NodeType.ELEMENT,
		names: null,
		isTransformer: false,
		namespaceSVG: false,
		tagName: 'template',
		is,
		attributes: {
			attributeIsValue: is,
			list: {
				[name]: 0 as any,
				0: {
					isTransformer: false,
					name,
					value: attr.value
				},
				'length=': 1
			}
		},
		$specifiedParams: null,
		events: null,
		domEvents: null,
		content: [el],
		contentTemplateIndex: null
	});
});
