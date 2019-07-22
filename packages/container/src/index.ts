import Container from "./Container";
import {DependencyKey} from "./types";

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
    Container
};

/**
 * Bind a Symbol to the container
 */
exports.bind = (...dependencies: any[]) => (Symbol: any) => {

    const Target = class extends Symbol{
        static get dependencies() {
            return dependencies;
        }
    };

    container.autoBind(Target);
};

/**
 * Bind a Symbol to the container as a singleton
 */
exports.singleton = (...dependencies: any[]) => (Symbol: any) => {
    const Target = class extends Symbol{
        static get dependencies() {
            return dependencies;
        }
    };

    container.autoSingleton(Target);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
exports.bindInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Symbol: any) => {
    const Target = class extends Symbol{
        static get dependencies() {
            return dependencies;
        }
    };

    container.bindInversion(AbstractSymbol, Target);
};

/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
exports.singletonInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Symbol: any) => {
    const Target = class extends Symbol{
        static get dependencies() {
            return dependencies;
        }
    };

    container.singletonInversion(AbstractSymbol, Target);
};

/**
 * Method decorator for injecting dependencies in to a class method
 */
exports.inject = (...dependencies: any[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const deps = dependencies.map((d: DependencyKey) => container.make(d));

        return originValue.apply(this, [...args, ...deps])
    }
};

