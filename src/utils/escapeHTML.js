let reAmpersand = /&/g;
let reLessThan = /</g;
let reGreaterThan = />/g;
let reQuote = /"/g;

function escapeHTML(str: string): string {
	return str
		.replace(reAmpersand, '&amp;')
		.replace(reLessThan, '&lt;')
		.replace(reGreaterThan, '&gt;')
		.replace(reQuote, '&quot;');
}

module.exports = escapeHTML;
