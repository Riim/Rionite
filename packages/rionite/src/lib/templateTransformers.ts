import { NodeType, Template } from '../Template';

[['IfThen', 'rn-if-then'], ['IfElse', 'rn-if-else'], ['Repeat', 'rn-repeat']].forEach(
	([name, is]) => {
		Template.elementTransformers[name] = el => {
			let attrs = el.attributes;

			// проверка на attrs для `@/name // ...`
			if (name != 'Repeat' && attrs) {
				let list = attrs.list;

				if (list) {
					let index = list['length='] - 1;
					let foundIndex: number | undefined;

					for (; index >= 0; index--) {
						if (list[index].value == '') {
							foundIndex = index;
						} else if (list[index].name == 'if') {
							break;
						}
					}

					if (index == -1 && foundIndex !== undefined) {
						let attr = list[foundIndex];

						delete list[attr.name];
						list['if'] = foundIndex;

						list[foundIndex] = {
							isTransformer: false,
							name: 'if',
							value: attr.name,
							pos: -1
						};
					}
				}
			}

			return [
				{
					nodeType: NodeType.ELEMENT,
					isTransformer: false,
					tagName: 'template',
					is,
					names: el.names,
					attributes: attrs,
					$specifiedParams: el.$specifiedParams,
					content: el.content,
					contentTemplateIndex: null
				}
			];
		};
	}
);

Template.elementTransformers.Slot = el => {
	return [
		{
			nodeType: NodeType.ELEMENT,
			isTransformer: false,
			tagName: 'rn-slot',
			is: null,
			names: el.names,
			attributes: el.attributes,
			$specifiedParams: el.$specifiedParams,
			content: el.content,
			contentTemplateIndex: null
		}
	];
};

[['if', 'rn-if-then'], ['unless', 'rn-if-else'], ['for', 'rn-repeat']].forEach(([name, is]) => {
	Template.attributeTransformers[name] = (el, attr) => {
		return {
			nodeType: NodeType.ELEMENT,
			isTransformer: false,
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
			content: [el],
			contentTemplateIndex: null
		};
	};
});
