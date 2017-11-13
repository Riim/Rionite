import { IEvent } from 'cellx';
import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents, IComponentOEvents } from './Component';

export function ComponentConfigDecorator<T extends Component>(config: {
	elementIs: string;
	elementExtends?: string | null;
	inputs?: { [name: string]: any } | null;
	i18n?: { [key: string]: any } | null;
	template?: string | IBlock | Template | null;
	oevents?: IComponentOEvents<T> | null;
	events?: IComponentEvents<T, IEvent<Component>> | null;
	domEvents?: IComponentEvents<T, Event> | null;
}) {
	return (componentConstr: Function) => {
		(componentConstr as typeof Component).elementIs = config.elementIs;
		if (config.elementExtends !== undefined) {
			(componentConstr as typeof Component).elementExtends = config.elementExtends;
		}

		if (config.inputs !== undefined) {
			(componentConstr as typeof Component).inputs = config.inputs;
		}

		if (config.i18n !== undefined) {
			(componentConstr as typeof Component).i18n = config.i18n;
		}

		if (config.template !== undefined) {
			(componentConstr as typeof Component).template = config.template;
		}

		if (config.oevents !== undefined) {
			(componentConstr as typeof Component).oevents = config.oevents;
		}
		if (config.events !== undefined) {
			(componentConstr as typeof Component).events = config.events;
		}
		if (config.domEvents !== undefined) {
			(componentConstr as typeof Component).domEvents = config.domEvents;
		}

		Component.register(componentConstr as typeof Component);
	};
}
