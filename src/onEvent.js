/**
 * @typesign (evt: cellx~Event|Event);
 */
export default function onEvent(evt) {
	let node;
	let attrName;
	let targetElements = [];

	if (evt instanceof Event) {
		node = evt.target;
		attrName = 'rt-' + evt.type;
	} else {
		node = evt.target.element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			targetElements.unshift(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let component = node.$c;

		if (component) {
			for (let i = targetElements.length; i;) {
				let targetElement = targetElements[--i];
				let handler = component[targetElement.getAttribute(attrName)];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, targetElement.$c || targetElement) === false) {
						evt.isPropagationStopped = true;
					}

					if (evt.isPropagationStopped) {
						return;
					}
				}
			}
		}
	}
}
