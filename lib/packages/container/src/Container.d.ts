import { DependencyKey, BindingReceipts, FactoryFunction } from "./types";
declare type ContainerFactoryFunction = FactoryFunction<Container, any>;
export default class Container {
    bindings: Map<DependencyKey, BindingReceipts<ContainerFactoryFunction>>;
    resolved: Map<DependencyKey, any>;
    /**
     *
     * @param key
     * @param factory
     */
    bind(key: DependencyKey, factory: FactoryFunction<Container, any>): this;
    /**
     *
     * @param key
     * @param value
     */
    value(key: DependencyKey, value: any): this;
    /**
     *
     * @param key
     * @param factory
     */
    singleton(key: DependencyKey, factory: ContainerFactoryFunction): this;
    /**
     *
     * @param key
     * @param customArguments
     */
    make<T>(key: DependencyKey | any, ...customArguments: any[]): T;
    /**
     *
     * @param Symbol
     */
    autoBind(Symbol: DependencyKey): this;
    /**
     *
     * @param Symbol
     */
    autoSingleton(Symbol: DependencyKey): this;
    /**
     *
     * @param Symbol
     */
    autoResolve(Symbol: DependencyKey): any;
    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    bindInversion(AbstractSymbol: DependencyKey, ConcreteSymbol: DependencyKey): this;
    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    singletonInversion(AbstractSymbol: DependencyKey, ConcreteSymbol: DependencyKey): this;
    /**
     *
     * @param key
     * @param methodName
     * @param customArguments
     */
    invoke(key: DependencyKey, methodName: string, ...customArguments: any[]): any;
    /**
     *
     * @param key
     */
    bound(key: DependencyKey): boolean;
}
export {};
