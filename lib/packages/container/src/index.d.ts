import Container from "./Container";
import { DependencyKey, FactoryFunction, TYPE_BINDING, TYPE_SINGLETON, TYPE_VALUE } from "./types";
export { DependencyKey, FactoryFunction, TYPE_BINDING, TYPE_SINGLETON, TYPE_VALUE };
/**
 * Making a singleton Container
 *
 * @type {Container}
 */
export declare const container: Container;
/**
 * Expose the Container class
 *
 * @type {Container}
 */
export { Container };
/**
 * Bind a Symbol to the container
 */
export declare const bind: (...dependencies: any[]) => (Target: any) => void;
/**
 * Bind a Symbol to the container as a singleton
 */
export declare const singleton: (...dependencies: any[]) => (Target: any) => void;
/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
export declare const bindInversion: (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => void;
/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
export declare const singletonInversion: (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => void;
/**
 * Method decorator for injecting dependencies in to a class method
 */
export declare const inject: (...dependencies: any[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
