import { Utils } from 'cellx';

let mixin = Utils.mixin;

declare class HTMLMenuItemElement extends HTMLElement {}

export default mixin(Object.create(null), {
	a: (<any>window).HTMLAnchorElement as HTMLAnchorElement,
	blockquote: (<any>window).HTMLQuoteElement as HTMLQuoteElement,
	br: (<any>window).HTMLBRElement as HTMLBRElement,
	caption: (<any>window).HTMLTableCaptionElement as HTMLTableCaptionElement,
	col: (<any>window).HTMLTableColElement as HTMLTableColElement,
	colgroup: (<any>window).HTMLTableColElement as HTMLTableColElement,
	datalist: (<any>window).HTMLDataListElement as HTMLDataListElement,
	del: (<any>window).HTMLModElement as HTMLModElement,
	dir: (<any>window).HTMLDirectoryElement as HTMLDirectoryElement,
	dl: (<any>window).HTMLDListElement as HTMLDListElement,
	document: (<any>window).HTMLDocument as HTMLDocument,
	element: Element,
	fieldset: (<any>window).HTMLFieldSetElement as HTMLFieldSetElement,
	frameset: (<any>window).HTMLFrameSetElement as HTMLFrameSetElement,
	h1: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	h2: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	h3: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	h4: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	h5: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	h6: (<any>window).HTMLHeadingElement as HTMLHeadingElement,
	hr: (<any>window).HTMLHRElement as HTMLHRElement,
	iframe: (<any>window).HTMLIFrameElement as HTMLIFrameElement,
	img: (<any>window).HTMLImageElement as HTMLImageElement,
	ins: (<any>window).HTMLModElement as HTMLModElement,
	li: (<any>window).HTMLLIElement as HTMLLIElement,
	menuitem: (<any>window).HTMLMenuItemElement as HTMLMenuItemElement,
	ol: (<any>window).HTMLOListElement as HTMLOListElement,
	optgroup: (<any>window).HTMLOptGroupElement as HTMLOptGroupElement,
	p: (<any>window).HTMLParagraphElement as HTMLParagraphElement,
	q: (<any>window).HTMLQuoteElement as HTMLQuoteElement,
	tbody: (<any>window).HTMLTableSectionElement as HTMLTableSectionElement,
	td: (<any>window).HTMLTableCellElement as HTMLTableCellElement,
	template: (<any>window).HTMLTemplateElement as HTMLTemplateElement || HTMLElement,
	textarea: (<any>window).HTMLTextAreaElement as HTMLTextAreaElement,
	tfoot: (<any>window).HTMLTableSectionElement as HTMLTableSectionElement,
	th: (<any>window).HTMLTableCellElement as HTMLTableCellElement,
	thead: (<any>window).HTMLTableSectionElement as HTMLTableSectionElement,
	tr: (<any>window).HTMLTableRowElement as HTMLTableRowElement,
	ul: (<any>window).HTMLUListElement as HTMLUListElement,
	vhgroupv: (<any>window).HTMLUnknownElement as HTMLUnknownElement,
	vkeygen: (<any>window).HTMLUnknownElement as HTMLUnknownElement
});
