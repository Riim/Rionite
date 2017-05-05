import { IBlock, Template as BemlTemplate } from '@riim/beml';
import { IComponentEvents, default as Component } from './Component';

let d = {
	Component: function Component_<T extends Component>(config: {
		elementIs: string,
		elementExtends?: string | null,
		props?: { [name: string]: any } | null,
		i18n?: { [key: string]: any },
		template?: string | IBlock | BemlTemplate | null,
		events?: IComponentEvents<T> | null
	}) {
		return function(componentConstr: typeof Component) {
			componentConstr.elementIs = config.elementIs;

			if (config.elementExtends !== undefined) {
				componentConstr.elementExtends = config.elementExtends;
			}

			if (config.props !== undefined) {
				componentConstr.props = config.props;
			}

			if (config.i18n) {
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
