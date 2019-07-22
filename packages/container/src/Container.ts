import {
    DependencyKey,
    BindingReceipts,
    FactoryFunction,
    HavingDependencies,
    TYPE_BINDING,
    TYPE_SINGLETON,
    TYPE_VALUE
} from "./types";

declare type ContainerFactoryFunction = FactoryFunction<Container, any>;

export default class Container {

    bindings: Map<DependencyKey, BindingReceipts<ContainerFactoryFunction>>
        = new Map<DependencyKey, BindingReceipts<ContainerFactoryFunction>>();

    resolved: Map<DependencyKey, any> = new Map<DependencyKey, any>();

    /**
     *
     * @param key
     * @param factory
     */
    bind(key: DependencyKey, factory: FactoryFunction<Container, any>) {
        this.bindings.set(key, { factory, type: TYPE_BINDING });

        return this;
    }

    /**
     *
     * @param key
     * @param value
     */
    value(key: DependencyKey, value: any) {
        this.bindings.set(key, { factory: () => value, type: TYPE_VALUE });
        this.resolved.set(key, value);

        return this;
    }

    /**
     *
     * @param key
     * @param factory
     */
    singleton(key: DependencyKey, factory: ContainerFactoryFunction) {
        this.bindings.set(key, { factory, type: TYPE_SINGLETON});

        return this;
    }

    /**
     *
     * @param key
     * @param customArguments
     */
    make(key: DependencyKey, ...customArguments: any[]) {

        if (this.resolved.has(key)) {
            return this.resolved.get(key);
        }

        const receipt = this.bindings.get(key);

        if (!receipt) {
            throw new Error(`E_BINDING: Could not resolve dependency [${key}]`);
        }

        let resolved = receipt.factory(this, ...customArguments);

        if (TYPE_SINGLETON === receipt.type) {
            this.resolved.set(key, resolved);
        }

        return resolved;
    }

    /**
     *
     * @param Symbol
     */
    autoBind(Symbol: HavingDependencies) {
        return this.bind(Symbol, () => this.autoResolve(Symbol));
    }

    /**
     *
     * @param Symbol
     */
    autoSingleton(Symbol: HavingDependencies) {
        return this.singleton(Symbol, () => this.autoResolve(Symbol));
    }

    /**
     *
     * @param Symbol
     */
    autoResolve(Symbol: HavingDependencies) {
        const symbolDependencies = Symbol['dependencies'];

        if (!symbolDependencies) {
            throw new Error('E_CONTAINER: Could not resolve the automatically, the Symbol');
        }

        const dependencies = Symbol['dependencies'].map(dependency => this.make(dependency));

        return new Symbol(...dependencies);
    }

    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    bindInversion(AbstractSymbol: DependencyKey, ConcreteSymbol: HavingDependencies) {
        return this.bind(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }

    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    singletonInversion(AbstractSymbol: DependencyKey, ConcreteSymbol: HavingDependencies) {
        return this.singleton(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }

    /**
     *
     * @param key
     * @param methodName
     * @param customArguments
     */
    invoke(key: DependencyKey, methodName: string, ...customArguments: any[]) {
        return this.make(key)[methodName](...customArguments);
    }

    /**
     *
     * @param key
     */
    bound(key: DependencyKey) {
        return this.bindings.has(key);
    }
}
