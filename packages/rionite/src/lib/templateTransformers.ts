import { NodeType, Template } from '../Template2';

for (let [name, is] of [
	['cond', 'rn-condition'],
	['repeat', 'rn-repeat']
]) {
	Template.elementTransformers[name] = (el) => [
		{
			nodeType: NodeType.ELEMENT,
			names: el.names,
			isTransformer: false,
			namespaceSVG: false,
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
}

for (let name of ['if', 'unless']) {
	Template.elementTransformers[name] = (el) => [
		{
			nodeType: NodeType.ELEMENT,
			names: el.names,
			isTransformer: false,
			namespaceSVG: false,
			tagName: 'template',
			is: 'rn-condition',
			attributes: {
				attributeIsValue: 'rn-condition',
				list: [
					{
						isTransformer: false,
						rawNames: null,
						name,
						value: el.attributes!.list![0].rawNames?.[0] ?? el.attributes!.list![0].name
					}
				]
			},
			$specifiedParams: null,
			events: null,
			domEvents: null,
			content: el.content,
			contentTemplateIndex: null
		}
	];
}

for (let [name, is] of [
	['if', 'rn-condition'],
	['unless', 'rn-condition'],
	['for', 'rn-repeat']
]) {
	Template.attributeTransformers[name] = (el, attr) => ({
		nodeType: NodeType.ELEMENT,
		names: null,
		isTransformer: false,
		namespaceSVG: false,
		tagName: 'template',
		is,
		attributes: {
			attributeIsValue: is,
			list: [
				{
					isTransformer: false,
					rawNames: null,
					name,
					value: attr.value
				}
			]
		},
		$specifiedParams: null,
		events: null,
		domEvents: null,
		content: [el],
		contentTemplateIndex: null
	});
}
