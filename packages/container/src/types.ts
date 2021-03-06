export type DependencyKey = Object|string|any;

export type BindingReceipts<FactoryFunction> = {
    factory: FactoryFunction,
    type: string
}

export type FactoryFunction<ForContainer, Returns> = (container: ForContainer, ...args: any[]) => Returns;

export const TYPE_BINDING      = 'binding';

export const TYPE_SINGLETON    = 'singleton';

export const TYPE_VALUE        = 'value';
