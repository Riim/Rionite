import { getText } from '@riim/gettext';

export const config = {
	getText: ((_msgctxt, msgid) => msgid) as typeof getText
};

export function configure(options: typeof config) {
	Object.assign(config, options);
	return config;
}
