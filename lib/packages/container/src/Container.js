"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Container {
    constructor() {
        this.bindings = new Map();
        this.resolved = new Map();
    }
    /**
     *
     * @param key
     * @param factory
     */
    bind(key, factory) {
        this.bindings.set(key, { factory, type: types_1.TYPE_BINDING });
        return this;
    }
    /**
     *
     * @param key
     * @param value
     */
    value(key, value) {
        this.bindings.set(key, { factory: () => value, type: types_1.TYPE_VALUE });
        this.resolved.set(key, value);
        return this;
    }
    /**
     *
     * @param key
     * @param factory
     */
    singleton(key, factory) {
        this.bindings.set(key, { factory, type: types_1.TYPE_SINGLETON });
        return this;
    }
    /**
     *
     * @param key
     * @param customArguments
     */
    make(key, ...customArguments) {
        if (this.resolved.has(key)) {
            return this.resolved.get(key);
        }
        const receipt = this.bindings.get(key);
        if (!receipt) {
            throw new Error(`E_BINDING: Could not resolve dependency [${key}]`);
        }
        let resolved = receipt.factory(this, ...customArguments);
        if (types_1.TYPE_SINGLETON === receipt.type) {
            this.resolved.set(key, resolved);
        }
        return resolved;
    }
    /**
     *
     * @param Symbol
     */
    autoBind(Symbol) {
        return this.bind(Symbol, () => this.autoResolve(Symbol));
    }
    /**
     *
     * @param Symbol
     */
    autoSingleton(Symbol) {
        return this.singleton(Symbol, () => this.autoResolve(Symbol));
    }
    /**
     *
     * @param Symbol
     */
    autoResolve(Symbol) {
        const symbolDependencies = Symbol['dependencies'];
        if (!symbolDependencies) {
            throw new Error('E_CONTAINER: Could not resolve the automatically, the Symbol');
        }
        const dependencies = Symbol['dependencies'].map((dependency) => this.make(dependency));
        return new Symbol(...dependencies);
    }
    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    bindInversion(AbstractSymbol, ConcreteSymbol) {
        return this.bind(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }
    /**
     *
     * @param AbstractSymbol
     * @param ConcreteSymbol
     */
    singletonInversion(AbstractSymbol, ConcreteSymbol) {
        return this.singleton(AbstractSymbol, () => this.autoResolve(ConcreteSymbol));
    }
    /**
     *
     * @param key
     * @param methodName
     * @param customArguments
     */
    invoke(key, methodName, ...customArguments) {
        return this.make(key)[methodName](...customArguments);
    }
    /**
     *
     * @param key
     */
    bound(key) {
        return this.bindings.has(key);
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map