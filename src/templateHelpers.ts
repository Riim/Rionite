import { NodeType, Template } from 'nelm';

['if-then', 'if-else', 'repeat'].forEach(tagName => {
	Template.helpers[tagName] = el => {
		let attrs = el.attributes;

		attrs = {
			superCall: attrs && attrs.superCall,
			list: attrs ? attrs.list.slice() : []
		};

		attrs.list.push({
			name: 'is',
			value: 'rt-' + tagName
		});

		return [
			{
				nodeType: NodeType.ELEMENT,
				isHelper: false,
				tagName: 'template',
				names: el.names && el.names[0] ? ['$' + el.names[0], ...el.names] : el.names,
				attributes: attrs,
				content: el.content
			}
		];
	};
});
