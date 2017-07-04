import { IBlock, Template } from 'nelm';
import { IComponentEvents, IComponentEvents2, default as Component } from './Component';

let d = {
	Component: function Component_<T extends Component>(config: {
		elementIs: string;
		elementExtends?: string | null;
		input?: { [name: string]: any } | null;
		i18n?: { [key: string]: any } | null;
		template?: string | IBlock | Template | null;
		events?: IComponentEvents<T> | null;
		events2?: IComponentEvents2<T> | null;
		domEvents?: IComponentEvents2<T> | null;
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

			if (config.events !== undefined) {
				componentConstr.events = config.events;
			}
			if (config.events2 !== undefined) {
				componentConstr.events2 = config.events2;
			}
			if (config.domEvents !== undefined) {
				componentConstr.domEvents = config.domEvents;
			}

			Component.register(componentConstr);
		};
	}
};

export default d;
