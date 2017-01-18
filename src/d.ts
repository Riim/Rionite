import { IComponentTemplate, IComponentEvents, default as Component } from './Component';

let d = {
	Component: function Component_<T extends Component>(config: {
		elementIs?: string,
		elementExtends?: string,
		props?: { [name: string]: any } | null,
		i18n?: { [key: string]: any },
		template?: string | IComponentTemplate | null,
		bemlTemplate?: string | null,
		events?: IComponentEvents<T> | null
	}) {
		return function(componentConstr: typeof Component) {
			if (config.elementIs) {
				componentConstr.elementIs = config.elementIs;
			}

			if (config.elementExtends) {
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
			if (config.bemlTemplate !== undefined) {
				componentConstr.bemlTemplate = config.bemlTemplate;
			}

			if (config.events !== undefined) {
				componentConstr.events = config.events;
			}

			Component.register(componentConstr);
		};
	}
};

export default d;
