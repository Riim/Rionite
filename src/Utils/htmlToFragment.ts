let range = document.createRange();
let htmlToFragment: (html: string) => DocumentFragment;

if (range.createContextualFragment) {
	let selected = false;

	htmlToFragment = function(html) {
		if (!selected) {
			range.selectNode(document.body);
			selected = true;
		}

		return range.createContextualFragment(html);
	};
} else {
	htmlToFragment = function(html) {
		let el = document.createElement('div');
		let df = document.createDocumentFragment();

		el.innerHTML = html;

		for (let child: Node | null; (child = el.firstChild);) {
			df.appendChild(child);
		}

		return df;
	};
}

export default htmlToFragment;
