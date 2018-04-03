import { NodeType } from 'nelm-parser';
import { Template } from '../Template';

['if-then', 'if-else', 'repeat'].forEach(name => {
	Template.helpers[name] = el => {
		let attrs = el.attributes;

		if (name != 'repeat') {
			let list = attrs!.list;
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
			value: 'rt-' + name
		});

		return [
			{
				nodeType: NodeType.ELEMENT,
				isHelper: false,
				tagName: 'template',
				names: el.names && el.names[0] ? ['$' + el.names[0], ...el.names] : null,
				attributes: attrs,
				content: el.content
			}
		];
	};
});
