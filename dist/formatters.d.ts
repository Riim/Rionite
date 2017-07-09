export declare let formatters: {
    or: (value: any, arg: any) => any;
    default: (value: any, arg: any) => any;
    not: (value: any) => boolean;
    eq: (value: any, arg: any) => boolean;
    identical: (value: any, arg: any) => boolean;
    lt: (value: number, arg: number) => boolean;
    lte: (value: number, arg: number) => boolean;
    gt: (value: number, arg: number) => boolean;
    gte: (value: number, arg: number) => boolean;
    join: (arr: any[] | null | undefined, separator?: string) => string | null | undefined;
    t: (key: string, ...args: any[]) => string;
    pt: (key: string, context: string, ...args: any[]) => string;
    nt: (count: number, key: string, ...args: any[]) => string;
    npt: (count: number, key: string, context: string, ...args: any[]) => string;
    key: (obj: Object, key: string) => any;
    json: (value: any) => string;
};
