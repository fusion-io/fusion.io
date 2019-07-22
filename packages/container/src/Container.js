const TYPE_BINDING      = 'binding';
const TYPE_SINGLETON    = 'singleton';
const TYPE_VALUE        = 'value';

class Container {

    /**
     * List of current binding receipts
     *
     * @type {Map<any, {factory: Function, type: string}>}
     */
    bindings = new Map();

    /**
     * List of resolved dependencies
     *
     * @type {Map<any, any>}
     */
    resolved = new Map();

    /**
     * Register a factory of a dependency to the Container
     *
     * @param {*} key
     * @param {Function} factory
     * @returns {Container}
     */
    bind(key, factory) {
        this.bindings.set(key, { factory, type: TYPE_BINDING });

        return this;
    }

    /**
     * Register a value as a dependency to the Container
     *
     * @param {*} key
     * @param value
     * @return {Container}
     */
    value(key, value) {
        this.bindings.set(key, { factory: null, type: TYPE_VALUE });
        this.resolved.set(key, value);

        return this;
    }

    /**
     * Register a dependency to the Container as a singleton
     *
     * @param {*} key
     * @param {Function} factory
     * @returns {Container}
     */
    singleton(key, factory) {
        this.bindings.set(key, { factory, type: TYPE_SINGLETON});

        return this;
    }

    /**
     * Resolve a dependency
     *
     * @param {*} key
     * @param customArguments
     * @return {*}
     */
    make(key, ...customArguments) {

        if (this.resolved.has(key)) {
            return this.resolved.get(key);
        }

        if (!this.bindings.has(key)) {
            throw new Error(`E_BINDING: Could not resolve dependency [${key}]`);
        }

        const {factory, type} = this.bindings.get(key);

        let resolved = factory(this, ...customArguments);

        if (TYPE_SINGLETON === type) {
            this.resolved.set(key, resolved);
        }

        return resolved;
    }

    /**
     * Register a symbol,
     * and let the container resolve the dependency via Symbol#depdencies metadata.
     *
     * @param Symbol
     */
    autoBind(Symbol) {
        return this.bind(Symbol, () => this.autoResolve(Symbol));
    }

    /**
     * Register a symbol as a singleton,
     * and let the container resolve the dependency via Symbol#depdencies metadata.
     *
     * @param Symbol
     */
    autoSingleton(Symbol) {
        return this.singleton(Symbol, () => this.autoResolve(Symbol));
    }

    /**
     * Automatically resolve a Symbol via #dependencies metadata
     *
     * @param Symbol
     */
    autoResolve(Symbol) {
        const symbolDependencies = Symbol['dependencies'];

        if (!symbolDependencies) {
            throw new Error('E_CONTAINER: Could not resolve the automatically, the Symbol');
        }

        const dependencies = Symbol['dependencies'].map(dependency => this.make(dependency));

        return new Symbol(...dependencies);
    }

    /**
     * Register a Symbol as an inversion of other
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    bindInversion(AbstractSymbol, ConcreteSymbol) {
        return this.bind(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }

    /**
     * Register a Symbol as an inversion of other as a singleton
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    singletonInversion(AbstractSymbol, ConcreteSymbol) {
        return this.singleton(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }

    /**
     * Invoking a method of a dependency
     */
    invoke(key, methodName, ...customArguments) {
        return this.make(key)[methodName](...customArguments);
    }

    /**
     * Determine if we bind a dependency before
     *
     * @param key
     * @return {boolean}
     */
    bound(key) {
        return this.bindings.has(key);
    }
}

module.exports = Container;
