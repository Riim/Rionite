import { IBlock, Template } from 'nelm';
import { IComponentEvents, default as Component } from './Component';

let d = {
	Component: function Component_<T extends Component>(config: {
		elementIs: string;
		elementExtends?: string | null;
		input?: { [name: string]: any } | null;
		i18n?: { [key: string]: any } | null;
		template?: string | IBlock | Template | null;
		events?: IComponentEvents<T> | null;
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

			Component.register(componentConstr);
		};
	}
};

export default d;
