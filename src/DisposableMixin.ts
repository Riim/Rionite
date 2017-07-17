import { EventEmitter, IEvent, Utils } from 'cellx';

let nextUID = Utils.nextUID;

export interface IDisposable {
	dispose(): any;
	[key: string]: any;
}

export interface IDisposableListening extends IDisposable {
	stop(): void;
}

export interface IDisposableTimeout extends IDisposable {
	clear(): void;
}

export interface IDisposableInterval extends IDisposable {
	clear(): void;
}

export interface IDisposableCallback extends IDisposable {
	(): void;
	cancel(): void;
}

export type TListeningTarget = EventEmitter | EventTarget | Array<EventEmitter | EventTarget> | NodeList |
	HTMLCollection;

export type TListener = (evt: IEvent | Event) => boolean | void;

export class DisposableMixin implements IDisposable {
	_disposables: { [id: string]: IDisposable } = {};

	listenTo(
		target: TListeningTarget | Array<TListeningTarget>,
		type: string | Array<string>,
		listener: TListener | Array<TListener>,
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | Array<TListeningTarget>,
		listeners: { [type: string]: TListener | Array<TListener> },
		context?: any,
		useCapture?: boolean
	): IDisposableListening;
	listenTo(
		target: TListeningTarget | Array<TListeningTarget>,
		typeOrListeners: string | Array<string> | { [type: string]: TListener | Array<TListener> },
		listenerOrContext?: TListener | Array<TListener> | any,
		contextOrUseCapture?: any,
		useCapture?: boolean
	): IDisposableListening {
		let listenings: Array<IDisposableListening>;

		if (typeof typeOrListeners == 'object') {
			listenings = [];

			if (Array.isArray(typeOrListeners)) {
				for (let i = 0, l = typeOrListeners.length; i < l; i++) {
					listenings.push(
						this.listenTo(
							target,
							typeOrListeners[i],
							listenerOrContext,
							contextOrUseCapture,
							useCapture
						)
					);
				}
			} else {
				for (let type in typeOrListeners) {
					listenings.push(
						this.listenTo(
							target,
							type,
							typeOrListeners[type],
							listenerOrContext,
							contextOrUseCapture
						)
					);
				}
			}
		} else {
			if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
				listenings = [];

				for (let i = 0, l = target.length; i < l; i++) {
					listenings.push(
						this.listenTo(
							target[i],
							typeOrListeners,
							listenerOrContext,
							contextOrUseCapture,
							useCapture
						)
					);
				}
			} else if (Array.isArray(listenerOrContext)) {
				listenings = [];

				for (let i = 0, l = listenerOrContext.length; i < l; i++) {
					listenings.push(
						this.listenTo(
							target,
							typeOrListeners,
							listenerOrContext[i],
							contextOrUseCapture,
							useCapture
						)
					);
				}
			} else {
				return this._listenTo(
					target,
					typeOrListeners,
					listenerOrContext,
					contextOrUseCapture !== undefined ? contextOrUseCapture : this,
					useCapture || false
				);
			}
		}

		let id = nextUID();

		let stopListening = () => {
			for (let i = listenings.length; i; ) {
				listenings[--i].stop();
			}

			delete this._disposables[id];
		};

		let listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	}

	_listenTo(
		target: EventEmitter | EventTarget,
		type: string,
		listener: TListener,
		context: any,
		useCapture: boolean
	): IDisposableListening {
		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else if (target.addEventListener) {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type, listener, useCapture);
		} else {
			throw new TypeError('Unable to add a listener');
		}

		let id = nextUID();

		let stopListening = () => {
			if (this._disposables[id]) {
				if (target instanceof EventEmitter) {
					target.off(type, listener, context);
				} else {
					target.removeEventListener(type, listener, useCapture);
				}

				delete this._disposables[id];
			}
		};

		let listening = this._disposables[id] = {
			stop: stopListening,
			dispose: stopListening
		};

		return listening;
	}

	// tslint:disable-next-line
	setTimeout(callback: Function, delay: number): IDisposableTimeout {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			delete this._disposables[id];
			callback.call(this);
		}, delay);

		let clearTimeout_ = () => {
			if (this._disposables[id]) {
				clearTimeout(timeoutId);
				delete this._disposables[id];
			}
		};

		let timeout = this._disposables[id] = {
			clear: clearTimeout_,
			dispose: clearTimeout_
		};

		return timeout;
	}

	// tslint:disable-next-line
	setInterval(callback: Function, delay: number): IDisposableInterval {
		let id = nextUID();

		let intervalId = setInterval(() => {
			callback.call(this);
		}, delay);

		let clearInterval_ = () => {
			if (this._disposables[id]) {
				clearInterval(intervalId);
				delete this._disposables[id];
			}
		};

		let interval = this._disposables[id] = {
			clear: clearInterval_,
			dispose: clearInterval_
		};

		return interval;
	}

	// tslint:disable-next-line
	registerCallback(callback: Function): IDisposableCallback {
		let id = nextUID();
		let disposable = this;

		let cancelCallback = () => {
			delete this._disposables[id];
		};

		let registeredCallback = function registeredCallback() {
			if (disposable._disposables[id]) {
				delete disposable._disposables[id];
				return callback.apply(disposable, arguments);
			}
		} as IDisposableCallback;
		registeredCallback.cancel = cancelCallback;
		registeredCallback.dispose = cancelCallback;

		this._disposables[id] = registeredCallback;

		return registeredCallback;
	}

	dispose(): DisposableMixin {
		let disposables = this._disposables;

		for (let id in disposables) {
			disposables[id].dispose();
		}

		return this;
	}
}
