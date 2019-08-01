export declare type DependencyKey = Object | string | any;
export declare type BindingReceipts<FactoryFunction> = {
    factory: FactoryFunction;
    type: string;
};
export declare type FactoryFunction<ForContainer, Returns> = (container: ForContainer, ...args: any[]) => Returns;
export declare const TYPE_BINDING = "binding";
export declare const TYPE_SINGLETON = "singleton";
export declare const TYPE_VALUE = "value";
