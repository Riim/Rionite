import { IEvent, EventEmitter, Utils } from 'cellx';

let nextUID = Utils.nextUID;

export type ListeningTarget = EventEmitter | EventTarget | Array<EventEmitter | EventTarget> | NodeList |
	HTMLCollection;

export interface IListener {
	(evt: IEvent | Event): boolean | undefined;
}

export interface IListening {
	stop: () => void,
	dispose: () => void
}

export default class DisposableMixin {
	_disposables: { [id: string]: any; } = {};

	listenTo(
		target: ListeningTarget | Array<ListeningTarget>,
		type: string | Array<string>,
		listener: IListener | Array<IListener>,
		context?: any
	): IListening;
	listenTo(
		target: ListeningTarget | Array<ListeningTarget>,
		listeners: { [type: string]: IListener | Array<IListener>; },
		context?: any
	): IListening;
	listenTo(
		target: ListeningTarget | Array<ListeningTarget>,
		typeOrListeners: string | Array<string> | { [type: string]: IListener | Array<IListener>; },
		listenerOrContext?: IListener | Array<IListener> | any,
		context?: any
	): IListening {
		let listenings: Array<IListening>;

		if (typeof typeOrListeners == 'object') {
			listenings = [];

			if (Array.isArray(typeOrListeners)) {
				if (arguments.length < 4) {
					context = this;
				}

				for (let type of typeOrListeners) {
					listenings.push(this.listenTo(target, type, listenerOrContext, context));
				}
			} else {
				if (arguments.length < 3) {
					listenerOrContext = this;
				}

				for (let type in typeOrListeners) {
					listenings.push(this.listenTo(target, type, typeOrListeners[type], listenerOrContext));
				}
			}
		} else {
			if (arguments.length < 4) {
				context = this;
			}

			if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
				listenings = [];

				for (let i = 0, l = target.length; i < l; i++) {
					listenings.push(this.listenTo(target[i], typeOrListeners, listenerOrContext, context));
				}
			} else if (Array.isArray(listenerOrContext)) {
				listenings = [];

				for (let listener of listenerOrContext) {
					listenings.push(this.listenTo(target, typeOrListeners, listener, context));
				}
			} else {
				return this._listenTo(target, typeOrListeners, listenerOrContext, context);
			}
		}

		let id = nextUID();

		let stopListening = () => {
			for (let i = listenings.length; i;) {
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
		listener: IListener,
		context: any
	): IListening {
		if (target instanceof EventEmitter) {
			target.on(type, listener, context);
		} else if (target.addEventListener) {
			if (target !== context) {
				listener = listener.bind(context);
			}

			target.addEventListener(type, listener);
		} else {
			throw new TypeError('Unable to add a listener');
		}

		let id = nextUID();

		let stopListening = () => {
			if (this._disposables[id]) {
				if (target instanceof EventEmitter) {
					target.off(type, listener, context);
				} else {
					target.removeEventListener(type, listener);
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

	setTimeout(cb: Function, delay: number): { clear: () => void, dispose: () => void } {
		let id = nextUID();

		let timeoutId = setTimeout(() => {
			delete this._disposables[id];
			cb.call(this);
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

	setInterval(cb: Function, delay: number): { clear: () => void, dispose: () => void } {
		let id = nextUID();

		let intervalId = setInterval(() => {
			cb.call(this);
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

	registerCallback(cb: Function): { (): void, cancel: () => void, dispose: () => void } {
		let id = nextUID();
		let disposable = this;

		let cancelCallback = () => {
			delete this._disposables[id];
		};

		let wrapper = function wrapper() {
			if (disposable._disposables[id]) {
				delete disposable._disposables[id];
				return cb.apply(disposable, arguments);
			}
		} as { (): void, cancel: () => void, dispose: () => void };
		wrapper.cancel = cancelCallback;
		wrapper.dispose = cancelCallback;

		this._disposables[id] = wrapper;

		return wrapper;
	}

	dispose(): DisposableMixin {
		let disposables = this._disposables;

		for (let id in disposables) {
			disposables[id].dispose();
		}

		return this;
	}
}
