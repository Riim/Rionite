import { hasOwn } from './JS/Object';
import { slice } from './JS/Array';

let reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;

let texts;
let getPluralIndex;

function configure(config) {
	let localeSettings = getText.localeSettings = config.localeSettings;

	texts = config.texts;
	getPluralIndex = Function('n', `return ${ localeSettings.plural };`);
}

export default function getText(context: string, key: string, plural: boolean, args: Array<string>): string {
	let rawText;

	if (hasOwn.call(texts, context) && hasOwn.call(texts[context], key)) {
		rawText = texts[context][key];

		if (plural) {
			rawText = rawText[getPluralIndex(args[0])];
		}
	} else {
		rawText = key;
	}

	let data = Object.create(null);

	args.forEach((arg, index) => {
		data[index + 1] = arg;
	});

	if (plural) {
		data.n = args[0];
	}

	let text = [];

	rawText = rawText.split(reInsert);

	for (let i = 0, l = rawText.length; i < l;) {
		if (i % 3) {
			text.push(rawText[i + 1] ? rawText[i + 1].split('|')[getPluralIndex(data[rawText[i]])] : data[rawText[i]]);
			i += 2;
		} else {
			text.push(rawText[i]);
			i++;
		}
	}

	return text.join('');
}

function t(key) {
	return getText('', key, false, slice.call(arguments, 1));
}

function pt(key, context) {
	return getText(context, key, false, slice.call(arguments, 1));
}

function nt(key/*, count*/) {
	return getText('', key, true, slice.call(arguments, 1));
}

function npt(key, context/*, count*/) {
	return getText(context, key, true, slice.call(arguments, 1));
}

getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;

configure({
	localeSettings: {
		// code: 'en',
		// plural: 'n == 1 ? 0 : 1'
		code: 'ru',
		plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
	},

	texts: {}
});
