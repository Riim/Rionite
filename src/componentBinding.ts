import { IEventData, IEvent, Cell } from 'cellx';

export type TFrozenStateChangeEvents = Array<{ listener: (evt: IEvent) => boolean | void; context: any }>;

export interface IFrozenState {
	changeEvents: TFrozenStateChangeEvents;
	value: any;
}

export interface IFreezableCell extends Cell<any> {
	_value: any;

	_changeEvent: IEvent | null;
	_canCancelChange: boolean;

	_frozenState: IFrozenState | null;

	_addToRelease(): void;
	_handleErrorEvent(evt: IEventData): void;
}

function freezeBinding(binding: IFreezableCell) {
	binding._frozenState = {
		changeEvents: binding.getEvents('change') as TFrozenStateChangeEvents,
		value: binding._value
	};

	binding.off();
}

function unfreezeBinding(binding: IFreezableCell) {
	let frozenState = binding._frozenState as IFrozenState;
	let changeEvents = frozenState.changeEvents;

	binding._frozenState = null;

	for (let evt of changeEvents) {
		binding.on('change', evt.listener, evt.context);
	}

	if (frozenState.value !== binding._value) {
		binding._changeEvent = {
			target: binding,
			type: 'change',
			oldValue: frozenState.value,
			value: binding._value,
			prev: null
		};
		binding._canCancelChange = true;

		binding._addToRelease();
	}
}

export function freezeBindings(bindings: Array<IFreezableCell>) {
	Cell.forceRelease();

	for (let binding of bindings) {
		freezeBinding(binding);
	}
}

export function unfreezeBindings(bindings: Array<IFreezableCell>) {
	Cell.forceRelease();

	for (let binding of bindings) {
		unfreezeBinding(binding);
	}

	Cell.forceRelease();
}
