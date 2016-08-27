let range = document.createRange();
let htmlToFragment;

if (range.createContextualFragment) {
	let selected = false;

	htmlToFragment = function(html: string): DocumentFragment {
		if (!selected) {
			range.selectNode(document.body);
			selected = true;
		}

		return range.createContextualFragment(html);
	};
} else {
	htmlToFragment = function(html: string): DocumentFragment {
		let el = document.createElement('div');
		let df = document.createDocumentFragment();

		el.innerHTML = html;

		for (let child; (child = el.firstChild);) {
			df.appendChild(child);
		}

		return df;
	};
}

export default htmlToFragment;
