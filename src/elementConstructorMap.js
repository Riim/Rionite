let { utils: { mixin } } = require('cellx');

module.exports = mixin(Object.create(null), {
	template: window.HTMLTemplateElement || HTMLElement,

	br: window.HTMLBRElement,
	caption: window.HTMLTableCaptionElement,
	col: window.HTMLTableColElement,
	datalist: window.HTMLDataListElement,
	dl: window.HTMLDListElement,
	fieldset: window.HTMLFieldSetElement,
	frameset: window.HTMLFrameSetElement,
	hr: window.HTMLHRElement,
	iframe: window.HTMLIFrameElement,
	li: window.HTMLLIElement,
	ol: window.HTMLOListElement,
	optgroup: window.HTMLOptGroupElement,
	tbody: window.HTMLTableSectionElement,
	td: window.HTMLTableCellElement,
	textarea: window.HTMLTextAreaElement,
	tfoot: window.HTMLTableSectionElement,
	thead: window.HTMLTableSectionElement,
	tr: window.HTMLTableRowElement,
	ul: window.HTMLUListElement
});
