/**
 * @typesign (evt: cellx~Event|Event);
 */
function onEvent(evt) {
	let node;
	let attrName;
	let targets = [];

	if (evt instanceof Event) {
		node = evt.target;
		attrName = 'rt-' + evt.type;
	} else {
		node = evt.target.element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			targets.unshift(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let component = node.$c;

		if (component) {
			for (let i = targets.length; i;) {
				let target = targets[--i];
				let handler = component[target.getAttribute(attrName)];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, target) === false) {
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

module.exports = onEvent;
