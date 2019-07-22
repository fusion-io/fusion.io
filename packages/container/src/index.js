const Container = require('./Container');

const container = new Container();

/**
 * Making a singleton Container
 *
 * @type {Container}
 */
exports.container = container;

/**
 * Expose the Container class
 *
 * @type {Container}
 */
exports.Container = Container;

/**
 * Bind a Symbol to the container
 */
exports.bind = (...dependencies) => Symbol => {
    Symbol.dependencies = dependencies;

    container.autoBind(Symbol);
};

/**
 * Bind a Symbol to the container as a singleton
 */
exports.singleton = (...dependencies) => Symbol => {
    Symbol.dependencies = dependencies;

    container.autoSingleton(Symbol);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
exports.bindInversion = (AbstractSymbol, ...dependencies) => Symbol => {
    Symbol.dependencies = dependencies;
    container.bindInversion(AbstractSymbol, Symbol);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
exports.singletonInversion = (AbstractSymbol, ...dependencies) => Symbol => {
    Symbol.dependencies = dependencies;
    container.singletonInversion(AbstractSymbol, Symbol);
};

/**
 * Method decorator for injecting dependencies in to a class method
 */
exports.inject = (...dependencies) => (target, propertyKey, descriptor) => {
    const originValue = descriptor.value;

    descriptor.value = function (...args) {
        const deps = dependencies.map(d => container.make(d));

        return originValue.apply(this, [...args, ...deps])
    }
};
