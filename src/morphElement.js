/**
 * Original code: https://github.com/patrick-steele-idem/morphdom
 */

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

function noop() {}

function defaultGetElementKey(el) {
	return el.getAttribute('key');
}

function morphAttributes(target, source) {
	let sourceAttributes = source.attributes;
	let foundAttributes = {};

	for (let i = sourceAttributes.length; i;) {
		let attr = sourceAttributes[--i];
		let attrName = attr.name;
		let attrValue = attr.value;

		foundAttributes[attrName] = foundAttributes;

		if (target.getAttribute(attrName) != attrValue) {
			target.setAttribute(attrName, attrValue);
		}
	}

	let targetAttributes = target.attributes;

	for (let i = targetAttributes.length; i;) {
		let attr = targetAttributes[--i];
		let attrName = attr.name;

		if (foundAttributes[attrName] != foundAttributes) {
			target.removeAttribute(attrName);
		}
	}
}

/**
 * @typesign (target: HTMLElement, source: HTMLElement, options?: {
 *     contentOnly?: boolean,
 *     getElementKey?: (el: HTMLElement) -> string|undefined,
 *     onBeforeMorphElement?: (source: HTMLElement, target: HTMLElement) -> boolean|undefined,
 *     onBeforeMorphElementContent?: (source: HTMLElement, target: HTMLElement) -> boolean|undefined,
 *     onKeyedElementRemoved?: (el: HTMLElement)
 * });
 */
function morphElement(target, source, options) {
	if (!options) {
		options = {};
	}

	let contentOnly = options.contentOnly === true;
	let getElementKey = options.getElementKey || defaultGetElementKey;
	let onBeforeMorphElement = options.onBeforeMorphElement || noop;
	let onBeforeMorphElementContent = options.onBeforeMorphElementContent || noop;
	let onKeyedElementRemoved = options.onKeyedElementRemoved || noop;

	let storedElements = Object.create(null);
	let unmatchedElements = Object.create(null);

	function storeContent(el) {
		for (let childNode = el.firstChild; childNode; childNode = childNode.nextSibling) {
			if (childNode.nodeType == 1) {
				let key = getElementKey(childNode);

				if (key) {
					storedElements[key] = childNode;
				}

				storeContent(childNode);
			}
		}
	}

	function _morphElement(target, source, contentOnly) {
		if (!contentOnly) {
			if (onBeforeMorphElement(target, source) === false) {
				return;
			}

			morphAttributes(target, source);

			if (onBeforeMorphElementContent(target, source) === false) {
				return;
			}
		}

		let targetTagName = target.tagName;

		if (targetTagName != 'TEXTAREA') {
			let targetChildNode = target.firstChild;
			let sourceChildNode = source.firstChild;

			outer: while (sourceChildNode) {
				let sourceChildNodeType = sourceChildNode.nodeType;
				let sourceChildNodeKey;

				if (sourceChildNodeType == 1) {
					sourceChildNodeKey = getElementKey(sourceChildNode);

					if (storedElements[sourceChildNodeKey]) {
						target.insertBefore(storedElements[sourceChildNodeKey], targetChildNode || null);
						delete storedElements[sourceChildNodeKey];

						sourceChildNode = sourceChildNode.nextSibling;

						continue;
					}
				}

				while (targetChildNode) {
					let targetChildNodeType = targetChildNode.nodeType;
					let targetChildNodeKey;

					if (targetChildNodeType == 1) {
						targetChildNodeKey = getElementKey(targetChildNode);
					}

					if (targetChildNodeType == sourceChildNodeType) {
						if (targetChildNodeType == 1) {
							if (
								targetChildNodeKey === sourceChildNodeKey &&
									targetChildNode.tagName == sourceChildNode.tagName
							) {
								_morphElement(targetChildNode, sourceChildNode, false);

								targetChildNode = targetChildNode.nextSibling;
								sourceChildNode = sourceChildNode.nextSibling;

								continue outer;
							}
						} else if (targetChildNodeType == 3 || targetChildNodeType == 8) {
							targetChildNode.nodeValue = sourceChildNode.nodeValue;

							targetChildNode = targetChildNode.nextSibling;
							sourceChildNode = sourceChildNode.nextSibling;

							continue outer;
						} else {
							throw new TypeError('Unsupported node type');
						}
					}

					let node = targetChildNode;
					targetChildNode = targetChildNode.nextSibling;

					if (targetChildNodeKey) {
						let el = unmatchedElements[targetChildNodeKey];

						if (el) {
							delete unmatchedElements[targetChildNodeKey];

							el.blank.parentNode.replaceChild(node, el.blank);
							_morphElement(node, el.source, false);
						} else {
							target.removeChild(node);
							storedElements[targetChildNodeKey] = node;
						}
					} else {
						target.removeChild(node);

						if (targetChildNodeType == 1) {
							storeContent(node);
						}
					}
				}

				switch (sourceChildNode.nodeType) {
					case 1: {
						let el = document.createElement(sourceChildNode.tagName);
						target.appendChild(el);

						if (sourceChildNodeKey) {
							unmatchedElements[sourceChildNodeKey] = {
								blank: el,
								source: sourceChildNode
							};
						} else {
							_morphElement(el, sourceChildNode, false);
						}

						break;
					}
					case 3: {
						target.appendChild(document.createTextNode(sourceChildNode.nodeValue));
						break;
					}
					case 8: {
						target.appendChild(document.createComment(sourceChildNode.nodeValue));
						break;
					}
					default: {
						throw new TypeError('Unsupported node type');
					}
				}

				sourceChildNode = sourceChildNode.nextSibling;
			}
		}

		let specialElementHandler = specialElementHandlers[targetTagName];

		if (specialElementHandler) {
			specialElementHandler(target, source);
		}
	}

	_morphElement(target, source, contentOnly);

	let ch;

	do {
		ch = false;

		for (let key in unmatchedElements) {
			let el = unmatchedElements[key];
			delete unmatchedElements[key];
			_morphElement(el.blank, el.source, false);
			ch = true;
		}
	} while (ch);

	for (let key in storedElements) {
		onKeyedElementRemoved(storedElements[key]);
	}
}

module.exports = morphElement;
