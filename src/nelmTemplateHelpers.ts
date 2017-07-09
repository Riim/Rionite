import {
	IElement,
	NodeType,
	TContent,
	Template
	} from 'nelm';

Template.helpers['if-then'] = Template.helpers['if-else'] = Template.helpers['repeat'] = (el: IElement): TContent => {
	let origAttrs = el.attributes;
	let attrs = {
		superCall: origAttrs && origAttrs.superCall,
		list: origAttrs ? origAttrs.list.slice() : []
	};

	attrs.list.push({
		name: 'is',
		value: 'rt-' + el.tagName
	});

	return [{
		nodeType: NodeType.ELEMENT,
		isHelper: false,
		tagName: 'template',
		names: el.names && el.names[0] ? ['$' + el.names[0], ...el.names] : el.names,
		attributes: attrs,
		content: el.content
	} as IElement];
};
