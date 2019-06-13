import { NodeType, Template } from '../Template';

[['IfThen', 'rn-if-then'], ['IfElse', 'rn-if-else'], ['Repeat', 'rn-repeat']].forEach(
	([name, is]) => {
	Template.transformers[name] = el => {
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
						name: 'if',
						value: attr.name
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

Template.transformers.Slot = el => {
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
