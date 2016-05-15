
let reLessThan = /&lt;/g;
let reGreaterThan = /&gt;/g;
let reQuote = /&quot;/g;
let reAmpersand = /&amp;/g;

/**
 * @typesign (str: string) -> string;
 */
function unescapeHTML(str) {
	return str
		.replace(reLessThan, '<')
		.replace(reGreaterThan, '>')
		.replace(reQuote, '"')
		.replace(reAmpersand, '&');
}

module.exports = unescapeHTML;
