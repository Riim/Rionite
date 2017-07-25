import { Cell, IEvent, IEventEmitterListener } from 'cellx';

export interface IFrozenState {
	changeEventListener: IEventEmitterListener;
	changeEventContext: any;
	value: any;
}

export interface IFreezableCell extends Cell {
	_value: any;

	_changeEvent: IEvent | null;
	_canCancelChange: boolean;

	_frozenState: IFrozenState | null;

	_addToRelease(): void;
}

function freezeBinding(binding: IFreezableCell) {
	let changeEvent = ((binding as any)._events.get('change') as any) as {
		listener: IEventEmitterListener;
		context: any;
	};

	(binding as any)._events.delete('change');

	binding._frozenState = {
		changeEventListener: changeEvent.listener,
		changeEventContext: changeEvent.context,
		value: binding._value
	};
}

function unfreezeBinding(binding: IFreezableCell) {
	let frozenState = binding._frozenState!;

	binding._frozenState = null;

	binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);

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
	Cell.afterRelease(() => {
		for (let binding of bindings) {
			unfreezeBinding(binding);
		}

		Cell.forceRelease();
	});
}
