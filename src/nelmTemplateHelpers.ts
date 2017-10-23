import { IElement, NodeType, Template } from 'nelm';

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
			} as IElement
		];
	};
});

Template.helpers.slot = el => {
	let name = el.names && el.names[0];

	if (!name) {
		throw new TypeError('@slot/name is required');
	}

	let attrs = el.attributes;

	attrs = {
		superCall: attrs && attrs.superCall,
		list: attrs ? attrs.list.slice() : []
	};

	attrs.list.push({
		name: 'name',
		value: name
	});

	return [
		{
			nodeType: NodeType.ELEMENT,
			isHelper: false,
			tagName: 'rt-slot',
			names: el.names,
			attributes: attrs,
			content: el.content
		} as IElement
	];
};
