import { BaseComponent } from '../BaseComponent';
import { Component } from '../decorators/Component';

@Component({
	elementIs: 'RnHtml',

	params: {
		html: { type: String, required: true }
	}
})
export class RnHtml extends BaseComponent {
	html: string;

	ready() {
		this._setHtml();
	}

	elementAttached() {
		this.listenTo(this, 'change:html', this._onHtmlChange);
	}

	_onHtmlChange() {
		this._setHtml();
	}

	_setHtml() {
		this.element.innerHTML = this.html;
	}
}
