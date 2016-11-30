interface IContentText {
	type: number,
	at: number,
	raw: string,
	value: string
}

interface IContentBindingFormatterArguments {
	type: number,
	at: number,
	raw: string,
	value: Array<string>
}

interface IContentBindingFormatter {
	type: number,
	at: number,
	raw: string,
	name: string,
	arguments: IContentBindingFormatterArguments | null
}

interface IContentBindingKeypath {
	type: number,
	at: number,
	raw: string,
	value: string
}

interface IContentBinding {
	type: number,
	at: number,
	raw: string,
	keypath: IContentBindingKeypath,
	formatters: Array<IContentBindingFormatter>
}

type Content = Array<IContentText | IContentBinding>;
