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
	return (componentCtor: typeof BaseComponent) => {
		if (config) {
			if (config.elementIs !== undefined) {
				componentCtor.elementIs = config.elementIs;
			}
			if (config.elementExtends !== undefined) {
				componentCtor.elementExtends = config.elementExtends;
			}
			if (config.params !== undefined) {
				componentCtor.params = config.params;
			}
			if (config.i18n !== undefined) {
				componentCtor.i18n = config.i18n;
			}
			if (config.template !== undefined) {
				componentCtor.template = config.template;
			}
			if (config.events !== undefined) {
				componentCtor.events = config.events;
			}
			if (config.domEvents !== undefined) {
				componentCtor.domEvents = config.domEvents;
			}
		}

		registerComponent(componentCtor as any);
	};
}
