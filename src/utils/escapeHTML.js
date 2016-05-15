let reAmpersand = /&/g;
let reLessThan = /</g;
let reGreaterThan = />/g;
let reQuote = /"/g;

/**
 * @typesign (str: string) -> string;
 */
function escapeHTML(str) {
	return str
		.replace(reAmpersand, '&amp;')
		.replace(reLessThan, '&lt;')
		.replace(reGreaterThan, '&gt;')
		.replace(reQuote, '&quot;');
}

module.exports = escapeHTML;
