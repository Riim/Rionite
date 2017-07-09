import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents, IComponentOEvents } from './Component';

Component.register;

export function ComponentDecorator<T extends Component>(config: {
	elementIs: string;
	elementExtends?: string | null;
	input?: { [name: string]: any } | null;
	i18n?: { [key: string]: any } | null;
	template?: string | IBlock | Template | null;
	oevents?: IComponentOEvents<T> | null;
	events?: IComponentEvents<T> | null;
	domEvents?: IComponentEvents<T> | null;
}) {
	return function(componentConstr: typeof Component) {
		componentConstr.elementIs = config.elementIs;

		if (config.elementExtends !== undefined) {
			componentConstr.elementExtends = config.elementExtends;
		}

		if (config.input !== undefined) {
			componentConstr.input = config.input;
		}

		if (config.i18n !== undefined) {
			componentConstr.i18n = config.i18n;
		}

		if (config.template !== undefined) {
			componentConstr.template = config.template;
		}

		if (config.oevents !== undefined) {
			componentConstr.oevents = config.oevents;
		}
		if (config.events !== undefined) {
			componentConstr.events = config.events;
		}
		if (config.domEvents !== undefined) {
			componentConstr.domEvents = config.domEvents;
		}

		Component.register(componentConstr);
	};
}
