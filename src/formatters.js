let getText = require('./getText');

let formatters = Object.create(null);
formatters.t = getText.t;
formatters.pt = getText.pt;
formatters.nt = getText.nt;
formatters.npt = getText.npt;

module.exports = formatters;
