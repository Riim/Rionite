/**
 * Original code: https://github.com/patrick-steele-idem/morphdom
 */

let PREFIX_ELEMENT = '@';
let PREFIX_KEY = ':';
let PREFIX_TEXT_NODE = ',';
let PREFIX_COMMENT_NODE = '#';

let specialElementHandlers = {
	INPUT(target, source) {
		if (target.value != source.value) {
			target.value = source.value;
		}

		target.checked = source.checked;
	},

	TEXTAREA(target, source) {
		let value = source.value;

		if (target.value != value) {
			target.value = value;
		}

		if (target.firstChild) {
			target.firstChild.nodeValue = value;
		}
	},

	OPTION(target, source) {
		target.selected = source.selected;
	}
};

function defaultGetElementKey(el) {
	return el.getAttribute('key');
}

function morphAttributes(target, source) {
	let sourceAttributes = source.attributes;
	let foundAttributes = Object.create(null);

	for (let i = sourceAttributes.length; i;) {
		let attr = sourceAttributes[--i];
		let attrName = attr.name;
		let attrValue = attr.value;

		foundAttributes[attrName] = true;

		if (target.getAttribute(attrName) != attrValue) {
			target.setAttribute(attrName, attrValue);
		}
	}

	let targetAttributes = target.attributes;

	for (let i = targetAttributes.length; i;) {
		let attr = targetAttributes[--i];
		let attrName = attr.name;

		if (!foundAttributes[attrName]) {
			target.removeAttribute(attrName);
		}
	}
}

/**
 * @typesign (target: HTMLElement, source: HTMLElement, options: {
 *     getElementKey?: (el: HTMLElement): string|undefined,
 *     contentOnly: boolean = false,
 *     onBeforeMorphElement?: (source: HTMLElement, target: HTMLElement): boolean|undefined,
 *     onBeforeMorphElementContent?: (source: HTMLElement, target: HTMLElement): boolean|undefined,
 *     onBeforeNodeDiscarded?: (node: Node): boolean|undefined,
 *     onNodeDiscarded?: (node: Node)
 * });
 */
function morphElement(target, source, options) {
	if (!options) {
		options = {};
	}

	let getElementKey = options.getElementKey || defaultGetElementKey;
	let contentOnly = options.contentOnly === true;
	let onBeforeMorphElement = options.onBeforeMorphElement;
	let onBeforeMorphElementContent = options.onBeforeMorphElementContent;
	let onBeforeNodeDiscarded = options.onBeforeNodeDiscarded;
	let onNodeDiscarded = options.onNodeDiscarded;

	let storedElements = {};
	let unmatchedElements = {};

	function storeContent(el) {
		let childNodes = el.childNodes;

		for (let i = 0, l = childNodes.length; i < l; i++) {
			let childNode = childNodes[i];

			if (childNode.nodeType == 1) {
				let key = getElementKey(childNode);

				if (key) {
					let stamp = PREFIX_ELEMENT + childNode.tagName + PREFIX_KEY + key;
					(storedElements[stamp] || (storedElements[stamp] = [])).push(childNode);
				}

				storeContent(childNode);
			}
		}
	}

	function morphNode(target, source, contentOnly) {
		if (target.nodeType == 1) {
			if (!contentOnly) {
				if (onBeforeMorphElement && onBeforeMorphElement(target, source) === false) {
					return;
				}

				morphAttributes(target, source);

				if (onBeforeMorphElementContent && onBeforeMorphElementContent(target, source) === false) {
					return;
				}
			}

			let targetChildNodes = target.childNodes;
			let storedChildNodes = {};

			for (let i = 0, l = targetChildNodes.length; i < l; i++) {
				let childNode = targetChildNodes[i];
				let stamp;

				switch (childNode.nodeType) {
					case 1: {
						let key = getElementKey(childNode);

						if (key) {
							stamp = PREFIX_ELEMENT + childNode.tagName + PREFIX_KEY + key;

							let els = unmatchedElements[stamp];

							if (els) {
								let el = els.shift();

								if (!els.length) {
									delete unmatchedElements[stamp];
								}

								el.blank.parentNode.replaceChild(childNode, el.blank);
								morphNode(childNode, el.element, false);
							} else {
								(storedElements[stamp] || (storedElements[stamp] = [])).push(childNode);
							}

							continue;
						}

						stamp = PREFIX_ELEMENT + childNode.tagName;
						break;
					}
					case 3: {
						stamp = PREFIX_TEXT_NODE + childNode.nodeValue;
						break;
					}
					case 8: {
						stamp = PREFIX_COMMENT_NODE + childNode.nodeValue;
						break;
					}
					default: {
						throw new TypeError('Unsupported node type');
					}
				}

				(storedChildNodes[stamp] || (storedChildNodes[stamp] = [])).push(childNode);
			}

			let sourceChildNodes = source.childNodes;

			for (let i = 0, l = sourceChildNodes.length; i < l; i++) {
				let sourceChildNode = sourceChildNodes[i];
				let stamp;
				let unique = false;

				switch (sourceChildNode.nodeType) {
					case 1: {
						let key = getElementKey(sourceChildNode);

						if (key) {
							stamp = PREFIX_ELEMENT + sourceChildNode.tagName + PREFIX_KEY + key;
							unique = true;
						} else {
							stamp = PREFIX_ELEMENT + sourceChildNode.tagName;
						}

						break;
					}
					case 3: {
						stamp = PREFIX_TEXT_NODE + sourceChildNode.nodeValue;
						break;
					}
					case 8: {
						stamp = PREFIX_COMMENT_NODE + sourceChildNode.nodeValue;
						break;
					}
					default: {
						throw new TypeError('Unsupported node type');
					}
				}

				let storedNodes = unique ? storedElements : storedChildNodes;
				let nodes = storedNodes[stamp];
				let beforeElement = targetChildNodes[i] || null;

				if (nodes) {
					let targetChildNode = nodes.shift();

					if (!nodes.length) {
						delete storedNodes[stamp];
					}

					if (!beforeElement || targetChildNode != beforeElement) {
						target.insertBefore(targetChildNode, beforeElement);
					}

					if (targetChildNode.nodeType == 1) {
						morphNode(targetChildNode, sourceChildNode, false);
					}
				} else {
					switch (sourceChildNode.nodeType) {
						case 1: {
							let el = document.createElement(sourceChildNode.tagName);
							target.insertBefore(el, beforeElement);

							if (unique) {
								(unmatchedElements[stamp] || (unmatchedElements[stamp] = [])).push({
									blank: el,
									element: sourceChildNode
								});
							} else {
								morphNode(el, sourceChildNode, false);
							}

							break;
						}
						case 3: {
							target.insertBefore(document.createTextNode(sourceChildNode.nodeValue), beforeElement);
							break;
						}
						case 8: {
							target.insertBefore(document.createComment(sourceChildNode.nodeValue), beforeElement);
							break;
						}
						default: {
							throw new TypeError('Unsupported node type');
						}
					}
				}
			}

			for (let stamp in storedChildNodes) {
				let childNodes = storedChildNodes[stamp];

				for (let i = 0, l = childNodes.length; i < l; i++) {
					let childNode = childNodes[i];

					if (!onBeforeNodeDiscarded || onBeforeNodeDiscarded(childNode) !== false) {
						childNode.parentNode.removeChild(childNode);

						if (childNode.nodeType == 1) {
							storeContent(childNode);
						}

						if (onNodeDiscarded) {
							onNodeDiscarded(childNode);
						}
					}
				}
			}

			let specialElementHandler = specialElementHandlers[target.tagName];

			if (specialElementHandler) {
				specialElementHandler(target, source);
			}
		} else {
			target.nodeValue = source.nodeValue;
		}
	}

	morphNode(target, source, contentOnly);

	let ch;

	do {
		ch = false;

		for (let stamp in unmatchedElements) {
			ch = true;

			let els = unmatchedElements[stamp];
			delete unmatchedElements[stamp];

			for (var i = 0, l = els.length; i < l; i++) {
				let el = els[i];
				morphNode(el.blank, el.element, false);
			}
		}
	} while (ch);

	for (let stamp in storedElements) {
		let els = storedElements[stamp];

		for (let i = 0, l = els.length; i < l; i++) {
			let el = els[i];

			if (!onBeforeNodeDiscarded || onBeforeNodeDiscarded(el) !== false) {
				el.parentNode.removeChild(el);

				if (onNodeDiscarded) {
					onNodeDiscarded(el);
				}
			}
		}
	}
}

module.exports = morphElement;
