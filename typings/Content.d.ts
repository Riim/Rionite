interface ContentBindingFormatterArguments {
	type: number,
	at: number,
	raw: string,
	value: Array<string>
}

interface ContentBindingFormatter {
	type: number,
	at: number,
	raw: string,
	name: string,
	arguments: ContentBindingFormatterArguments | null
}

interface ContentBindingKeypath {
	type: number,
	at: number,
	raw: string,
	value: string
}

interface ContentBinding {
	type: number,
	at: number,
	raw: string,
	keypath: ContentBindingKeypath,
	formatters: Array<ContentBindingFormatter>
}
