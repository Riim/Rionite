export function InterruptError() {
	if (!(this instanceof InterruptError)) {
		return new (InterruptError as any)();
	}
}

InterruptError.prototype = {
	__proto__: Error.prototype,
	constructor: InterruptError
};
