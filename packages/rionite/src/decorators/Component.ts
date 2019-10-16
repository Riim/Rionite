import { IEvent } from 'cellx';
import { BaseComponent, IComponentEvents } from '../BaseComponent';
import { registerComponent } from '../registerComponent';
import { IBlock, Template } from '../Template';

export function Component<T extends BaseComponent>(config?: {
	elementIs?: string;
	elementExtends?: string | null;
	params?: Record<string, any> | null;
	i18n?: Record<string, any> | null;
	template?: string | IBlock | Template | null;
	events?: IComponentEvents<T, IEvent<BaseComponent>> | null;
	domEvents?: IComponentEvents<T, Event> | null;
}) {
	return (componentConstr: typeof BaseComponent) => {
		if (config) {
			if (config.elementIs !== undefined) {
				componentConstr.elementIs = config.elementIs;
			}
			if (config.elementExtends !== undefined) {
				componentConstr.elementExtends = config.elementExtends;
			}
			if (config.params !== undefined) {
				componentConstr.params = config.params;
			}
			if (config.i18n !== undefined) {
				componentConstr.i18n = config.i18n;
			}
			if (config.template !== undefined) {
				componentConstr.template = config.template;
			}
			if (config.events !== undefined) {
				componentConstr.events = config.events;
			}
			if (config.domEvents !== undefined) {
				componentConstr.domEvents = config.domEvents;
			}
		}

		registerComponent(componentConstr as any);
	};
}
