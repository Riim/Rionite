import { IEvent } from 'cellx';
import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents } from './Component';

export function ComponentConfigDecorator<T extends Component>(config: {
	elementIs: string;
	elementExtends?: string | null;
	params?: { [name: string]: any } | null;
	i18n?: { [key: string]: any } | null;
	template?: string | IBlock | Template | null;
	events?: IComponentEvents<T, IEvent<Component>> | null;
	domEvents?: IComponentEvents<T, Event> | null;
}) {
	return (componentConstr: Function) => {
		(componentConstr as typeof Component).elementIs = config.elementIs;
		if (config.elementExtends !== undefined) {
			(componentConstr as typeof Component).elementExtends = config.elementExtends;
		}

		if (config.params !== undefined) {
			(componentConstr as typeof Component).params = config.params;
		}

		if (config.i18n !== undefined) {
			(componentConstr as typeof Component).i18n = config.i18n;
		}

		if (config.template !== undefined) {
			(componentConstr as typeof Component).template = config.template;
		}

		if (config.events !== undefined) {
			(componentConstr as typeof Component).events = config.events;
		}
		if (config.domEvents !== undefined) {
			(componentConstr as typeof Component).domEvents = config.domEvents;
		}

		Component.register(componentConstr as any);
	};
}
