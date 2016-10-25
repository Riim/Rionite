import { hasOwn } from './JS/Object';

let reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;

let texts;
let getPluralIndex;

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

	for (let i = args.length; i;) {
		data[i] = args[--i];
	}

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

function configure(config) {
	texts = config.texts;
	getPluralIndex = Function('n', `return ${ config.localeSettings.plural };`);

	getText.localeSettings = config.localeSettings;
}

function t(key, ...args) {
	return getText('', key, false, args);
}

function pt(key, context, ...args) {
	return getText(context, key, false, args);
}

function nt(key, ...args) {
	return getText('', key, true, args);
}

function npt(key, context, ...args) {
	return getText(context, key, true, args);
}

getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;

configure({
	localeSettings: {
		code: 'ru',
		plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
	},

	texts: {}
});
