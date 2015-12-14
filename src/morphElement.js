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

function isEmpty(obj) {
	for (let name in obj) {
		return false;
	}
	return true;
}

function defaultGetElementKey(el) {
	return el.getAttribute('key') || undefined;
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

	let activeElement = document.activeElement;
	let scrollLeft;
	let scrollTop;

	if ('selectionStart' in activeElement) {
		scrollLeft = activeElement.scrollLeft;
		scrollTop = activeElement.scrollTop;
	}

	let storedElements = Object.create(null);
	let unmatchedElements = Object.create(null);

	function storeContent(el) {
		for (let child = el.firstChild; child; child = child.nextSibling) {
			if (child.nodeType == 1) {
				let key = getElementKey(child);

				if (key) {
					storedElements[key] = child;
				}

				storeContent(child);
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
			let targetChild = target.firstChild;
			let fromChild = targetChild;

			for (let sourceChild = source.firstChild; sourceChild; sourceChild = sourceChild.nextSibling) {
				let sourceChildType = sourceChild.nodeType;
				let sourceChildTagName = sourceChild.tagName;
				let sourceChildKey;

				if (sourceChildType == 1) {
					sourceChildKey = getElementKey(sourceChild);

					if (storedElements[sourceChildKey]) {
						target.insertBefore(storedElements[sourceChildKey], targetChild || null);
						delete storedElements[sourceChildKey];
						continue;
					}
				}

				let found = false;

				while (targetChild) {
					if (targetChild.nodeType == sourceChildType) {
						if (targetChild.nodeType == 1) {
							if (
								targetChild.tagName == sourceChildTagName &&
									getElementKey(targetChild) === sourceChildKey
							) {
								found = true;
								_morphElement(targetChild, sourceChild, false);
							}
						} else {
							found = true;
							targetChild.nodeValue = sourceChild.nodeValue;
						}
					}

					if (found) {
						if (targetChild == fromChild) {
							targetChild = fromChild = fromChild.nextSibling;
						} else {
							target.insertBefore(targetChild, fromChild);
							targetChild = fromChild;
						}

						break;
					}

					targetChild = targetChild.nextSibling;
				}

				if (!found) {
					switch (sourceChild.nodeType) {
						case 1: {
							let el = document.createElement(sourceChildTagName);
							target.insertBefore(el, fromChild || null);

							if (sourceChildKey) {
								unmatchedElements[sourceChildKey] = {
									blank: el,
									source: sourceChild
								};
							} else {
								_morphElement(el, sourceChild, false);
							}

							break;
						}
						case 3: {
							target.insertBefore(document.createTextNode(sourceChild.nodeValue), fromChild || null);
							break;
						}
						case 8: {
							target.insertBefore(document.createComment(sourceChild.nodeValue), fromChild || null);
							break;
						}
						default: {
							throw new TypeError('Unsupported node type');
						}
					}

					targetChild = fromChild;
				}
			}

			while (fromChild) {
				let child = fromChild;
				fromChild = fromChild.nextSibling;

				if (child.nodeType == 1) {
					let childKey = getElementKey(child);

					if (childKey) {
						let unmatchedElement = unmatchedElements[childKey];

						if (unmatchedElement) {
							delete unmatchedElements[childKey];

							unmatchedElement.blank.parentNode.replaceChild(child, unmatchedElement.blank);
							_morphElement(child, unmatchedElement.source, false);

							continue;
						}

						storedElements[childKey] = child;
					} else {
						storeContent(child);
					}
				}

				target.removeChild(child);
			}
		}

		let specialElementHandler = specialElementHandlers[targetTagName];

		if (specialElementHandler) {
			specialElementHandler(target, source);
		}
	}

	_morphElement(target, source, contentOnly);

	while (!isEmpty(unmatchedElements)) {
		for (let key in unmatchedElements) {
			let el = unmatchedElements[key];
			delete unmatchedElements[key];
			_morphElement(el.blank, el.source, false);
		}
	}

	for (let key in storedElements) {
		onKeyedElementRemoved(storedElements[key]);
	}

	if (activeElement != document.activeElement) {
		if (scrollLeft !== undefined) {
			activeElement.scrollLeft = scrollLeft;
			activeElement.scrollTop = scrollTop;
		}

		activeElement.focus();
	}
}

module.exports = morphElement;
