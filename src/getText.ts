let hasOwn = Object.prototype.hasOwnProperty;

let reInsert = /\{([1-9]\d*|n)(?::((?:[^|]*\|)+?[^}]*))?\}/;

export interface ILocaleSettings {
	code: string;
	plural: string;
}

export interface ILocalizationTexts {
	[context: string]: {
		[key: string]: string | Array<string>
	}
}

export interface IGetTextConfig {
	localeSettings: ILocaleSettings;
	texts: ILocalizationTexts;
}

export interface IGetText {
	localeSettings: ILocaleSettings;
	configure(config: IGetTextConfig): void;
	(context: string, key: string, plural: boolean, args: Array<any>): string;
	t(key: string, ...args: Array<any>): string;
	pt(key: string, context: string, ...args: Array<any>): string;
	nt(key: string, ...args: Array<any>): string;
	npt(key: string, context: string, ...args: Array<any>): string;
}

let texts: ILocalizationTexts;
let getPluralIndex: (n: number) => number;

let getText = <IGetText>function getText(context: string, key: string, plural: boolean, args: Array<any>): string {
	let rawText: string;

	if (hasOwn.call(texts, context) && hasOwn.call(texts[context], key)) {
		rawText = (plural ? texts[context][key][getPluralIndex(+args[0])] : texts[context][key] as string);
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

	let splittedRawText = rawText.split(reInsert);
	let text: Array<string> = [];

	for (let i = 0, l = splittedRawText.length; i < l;) {
		if (i % 3) {
			text.push(
				splittedRawText[i + 1] ?
					splittedRawText[i + 1].split('|')[getPluralIndex(data[splittedRawText[i]])] :
					data[splittedRawText[i]]
			);

			i += 2;
		} else {
			text.push(splittedRawText[i]);
			i++;
		}
	}

	return text.join('');
}

function configure(config: IGetTextConfig) {
	texts = config.texts;
	getPluralIndex = Function('n', `return ${ config.localeSettings.plural };`) as (n: number) => number;

	getText.localeSettings = config.localeSettings;
}

function t(key: string, ...args: Array<any>) {
	return getText('', key, false, args);
}

function pt(key: string, context: string, ...args: Array<any>) {
	return getText(context, key, false, args);
}

function nt(key: string, ...args: Array<any>) {
	return getText('', key, true, args);
}

function npt(key: string, context: string, ...args: Array<any>) {
	return getText(context, key, true, args);
}

getText.configure = configure;
getText.t = t;
getText.pt = pt;
getText.nt = nt;
getText.npt = npt;

export default getText;

configure({
	localeSettings: {
		code: 'ru',
		plural: '(n%100) >= 5 && (n%100) <= 20 ? 2 : (n%10) == 1 ? 0 : (n%10) >= 2 && (n%10) <= 4 ? 1 : 2'
	},

	texts: {}
});
