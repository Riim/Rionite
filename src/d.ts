import { IComponentTemplate, default as Component } from './Component';

let d = {
	Component: function Component_(config: {
		elementIs?: string,
		elementExtends?: string,
		elementAttributes?: { [name: string]: any; } | null,
		props?: { [name: string]: any; } | null,
		i18n?: { [key: string]: any; },
		template?: string | IComponentTemplate | null,
		events?: { [assetName: string]: { [eventName: string]: Function; }; } | null
	}) {
		return function(componentConstr: typeof Component): void {
			if (config.elementIs) {
				componentConstr.elementIs = config.elementIs;
			}

			if (config.elementExtends) {
				componentConstr.elementExtends = config.elementExtends;
			}

			if (config.elementAttributes !== undefined) {
				componentConstr.elementAttributes = config.elementAttributes;
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
