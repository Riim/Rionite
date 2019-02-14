if (!('firstElementChild' in DocumentFragment.prototype)) {
	Object.defineProperty(DocumentFragment.prototype, 'firstElementChild', {
		configurable: true,
		enumerable: false,

		get() {
			for (let child = this.firstChild; child; child = child.nextSibling) {
				if (child.nodeType == Node.ELEMENT_NODE) {
					return child;
				}
			}

			return null;
		}
	});
}

if (!('nextElementSibling' in DocumentFragment.prototype)) {
	Object.defineProperty(DocumentFragment.prototype, 'nextElementSibling', {
		configurable: true,
		enumerable: false,

		get() {
			for (let child = this.nextSibling; child; child = child.nextSibling) {
				if (child.nodeType == Node.ELEMENT_NODE) {
					return child;
				}
			}

			return null;
		}
	});
}
