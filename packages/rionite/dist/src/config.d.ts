import { getText } from '@riim/gettext';
export declare const config: {
    getText: typeof getText;
};
export declare function configure(options: typeof config): {
    getText: typeof getText;
};
