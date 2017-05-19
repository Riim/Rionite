export interface ILocaleSettings {
    code: string;
    plural: string;
}
export interface ILocalizationTexts {
    [context: string]: {
        [key: string]: string | Array<string>;
    };
}
export interface IGetTextConfig {
    localeSettings: ILocaleSettings;
    texts: ILocalizationTexts;
}
export interface IGetText {
    localeSettings: ILocaleSettings;
    configure(config: IGetTextConfig): void;
    (context: string, key: string, plural: boolean, args: Array<any>): string;
    t(key: string, ...args: Array<any>): string;
    pt(key: string, context: string, ...args: Array<any>): string;
    nt(key: string, ...args: Array<any>): string;
    npt(key: string, context: string, ...args: Array<any>): string;
}
declare let getText: IGetText;
export default getText;
