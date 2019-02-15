import { IEvent } from 'cellx';
import { BaseComponent, IComponentEvents } from '../BaseComponent';
import { registerComponent } from '../registerComponent';
import { IBlock, Template } from '../Template';

export function Component<T extends BaseComponent>(config?: {
	elementIs?: string;
	elementExtends?: string | null;
	params?: { [name: string]: any } | null;
	i18n?: { [key: string]: any } | null;
	template?: string | IBlock | Template | null;
	events?: IComponentEvents<T, IEvent<BaseComponent>> | null;
	domEvents?: IComponentEvents<T, Event> | null;
}) {
	return (componentConstr: Function) => {
		if (config) {
			if (config.elementIs !== undefined) {
				(componentConstr as typeof BaseComponent).elementIs = config.elementIs;
			}

			if (config.elementExtends !== undefined) {
				(componentConstr as typeof BaseComponent).elementExtends = config.elementExtends;
			}

			if (config.params !== undefined) {
				(componentConstr as typeof BaseComponent).params = config.params;
			}

			if (config.i18n !== undefined) {
				(componentConstr as typeof BaseComponent).i18n = config.i18n;
			}

			if (config.template !== undefined) {
				(componentConstr as typeof BaseComponent).template = config.template;
			}

			if (config.events !== undefined) {
				(componentConstr as typeof BaseComponent).events = config.events;
			}

			if (config.domEvents !== undefined) {
				(componentConstr as typeof BaseComponent).domEvents = config.domEvents;
			}
		}

		registerComponent(componentConstr as any);
	};
}
