/**
 * @typesign (el: HTMLElement, name: string) -> boolean;
 */
let hasClass;

if (document.documentElement.classList) {
	hasClass = (el, name) => {
		return el.classList.contains(name);
	};
} else {
	let reNotWhite = /\S+/g;

	hasClass = (el, name) => {
		return (el.className.match(reNotWhite) || []).indexOf(name) != -1;
	};
}

module.exports = hasClass;
