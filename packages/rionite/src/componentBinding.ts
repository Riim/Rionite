import { Cell, IRegisteredEvent, TListener } from 'cellx';

export interface IFrozenState {
	changeEventListener: TListener;
	changeEventContext: any;
	value: any;
}

const KEY_FROZEN_STATE = Symbol('frozenState');

export interface IBinding extends Cell {
	[KEY_FROZEN_STATE]: IFrozenState | null;
}

function freezeBinding(binding: IBinding) {
	let changeEvent = binding._events.get('change') as IRegisteredEvent;

	binding._events.delete('change');

	binding[KEY_FROZEN_STATE] = {
		changeEventListener: changeEvent.listener,
		changeEventContext: changeEvent.context,
		value: binding._value
	};
}

function unfreezeBinding(binding: IBinding) {
	let frozenState = binding[KEY_FROZEN_STATE]!;

	binding[KEY_FROZEN_STATE] = null;

	binding.on('change', frozenState.changeEventListener, frozenState.changeEventContext);

	if (frozenState.value !== binding._value) {
		binding.emit('change', {
			prevValue: frozenState.value,
			value: binding._value
		});
	}
}

export function freezeBindings(bindings: Array<IBinding>) {
	Cell.release();

	for (let binding of bindings) {
		freezeBinding(binding);
	}
}

export function unfreezeBindings(bindings: Array<IBinding>) {
	for (let binding of bindings) {
		unfreezeBinding(binding);
	}

	Cell.release();
}
