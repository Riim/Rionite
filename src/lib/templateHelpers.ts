import { NodeType, Template } from '../Template2';

['if-then', 'if-else', 'repeat'].forEach(name => {
	Template.helpers[name] = el => {
		let attrs = el.attributes;

		// проверка на attrs для `@/name // ...`
		if (name != 'repeat' && attrs) {
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
				isHelper: false,
				tagName: 'template',
				is: 'rn-' + name,
				names: el.names,
				attributes: attrs,
				content: el.content,
				contentTemplateIndex: null
			}
		];
	};
});

Template.helpers.slot = el => {
	return [
		{
			nodeType: NodeType.ELEMENT,
			isHelper: false,
			tagName: 'rn-slot',
			is: null,
			names: el.names,
			attributes: el.attributes,
			content: el.content,
			contentTemplateIndex: null
		}
	];
};
