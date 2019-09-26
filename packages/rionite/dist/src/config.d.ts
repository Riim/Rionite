import { getText } from '@riim/gettext';
export declare const config: {
    logError: (...args: any[]) => void;
    getText: typeof getText;
};
export declare function configure(options: Partial<typeof config>): {
    logError: (...args: any[]) => void;
    getText: typeof getText;
};
