import { getText } from '@riim/gettext';

export const config = {
	logError: (...args: Array<any>) => {
		console.error(...args);
	},

	getText: ((_msgctxt, msgid) => msgid) as typeof getText
};

export function configure(options: Partial<typeof config>) {
	Object.assign(config, options);
	return config;
}
