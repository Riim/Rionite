;(function(d) {
	if ('content' in d.createElement('template')) {
		return;
	}

	var style = d.createElement('style');
	style.type = 'text/css';
	style.textContent = 'template { display: none !important; }';
	d.getElementsByTagName('head')[0].appendChild(style);

	Object.defineProperty(HTMLElement.prototype, 'content', {
		configurable: true,
		enumerable: true,

		get: function() {
			if (this.__contentische__) {
				return this.__contentische__;
			}

			if (this.tagName == 'TEMPLATE') {
				var df = this.__contentische__ = d.createDocumentFragment();

				for (var child; (child = this.firstChild);) {
					df.appendChild(child);
				}

				return df;
			}
		}
	});
})(document);
