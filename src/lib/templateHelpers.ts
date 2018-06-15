import { NodeType } from 'nelm-parser';
import { Template } from '../Template';

['if-then', 'if-else', 'repeat'].forEach(name => {
	Template.helpers[name] = el => {
		let attrs = el.attributes;

		// проверка на attrs для `@div/name // ...`
		if (attrs && name != 'repeat') {
			let list = attrs.list;
			let index = list.length - 1;
			let foundIndex: number | undefined;

			for (; index >= 0; index--) {
				if (list[index].value == '') {
					foundIndex = index;
				} else if (list[index].name == 'if') {
					break;
				}
			}

			if (index == -1 && foundIndex !== undefined) {
				list[foundIndex] = {
					name: 'if',
					value: list[foundIndex].name
				};
			}
		}

		attrs = {
			superCall: attrs && attrs.superCall,
			list: attrs ? attrs.list.slice() : []
		};

		attrs.list.push({
			name: 'is',
			value: 'rn-' + name
		});

		return [
			{
				nodeType: NodeType.ELEMENT,
				tagName: 'template',
				isHelper: false,
				names: el.names && el.names[0] ? ['_' + el.names[0], ...el.names] : null,
				attributes: attrs,
				content: el.content
			}
		];
	};
});

Template.helpers.slot = el => {
	return [
		{
			nodeType: NodeType.ELEMENT,
			tagName: 'rn-slot2',
			isHelper: false,
			names: el.names && el.names[0] ? ['_' + el.names[0], ...el.names] : null,
			attributes: el.attributes,
			content: el.content && [
				{
					nodeType: NodeType.ELEMENT,
					tagName: 'template',
					isHelper: false,
					names: null,
					attributes: null,
					content: el.content
				}
			]
		}
	];
};
