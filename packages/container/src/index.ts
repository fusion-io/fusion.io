import Container from "./Container";
import Manager from "./Manager";
import {
    DependencyKey,
    FactoryFunction,
    TYPE_BINDING,
    TYPE_SINGLETON,
    TYPE_VALUE
} from "./types";


export {
    DependencyKey,
    FactoryFunction,
    TYPE_BINDING,
    TYPE_SINGLETON,
    TYPE_VALUE
}

/**
 * Making a singleton Container
 *
 * @type {Container}
 */
export const container = new Container();


/**
 * Expose the Container class
 *
 * @type {Container}
 */
export {
    Container,
    Manager
};

/**
 * Bind a Symbol to the container
 */
export const bind = (...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    container.autoBind(Target);
};

/**
 * Bind a Symbol to the container as a singleton
 */
export const singleton = (...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    container.autoSingleton(Target);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
export const bindInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    container.bindInversion(AbstractSymbol, Target);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
export const singletonInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    container.singletonInversion(AbstractSymbol, Target);
};

/**
 * Method decorator for injecting dependencies in to a class method
 */
export const inject = (...dependencies: any[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const deps = dependencies.map((d: DependencyKey) => container.make(d));

        return originValue.apply(this, [...args, ...deps]);
    }
};

