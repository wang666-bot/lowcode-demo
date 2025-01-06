declare const plugin: {
    (ctx: any): {
        name: string;
        width: number;
        dep: any[];
        exports(): {};
        init(): void;
    };
    pluginName: string;
};
export default plugin;
