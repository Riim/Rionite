let reLessThan = /&lt;/g;
let reGreaterThan = /&gt;/g;
let reQuote = /&quot;/g;
let reAmpersand = /&amp;/g;

function unescapeHTML(str: string): string {
	return str
		.replace(reLessThan, '<')
		.replace(reGreaterThan, '>')
		.replace(reQuote, '"')
		.replace(reAmpersand, '&');
}

module.exports = unescapeHTML;
