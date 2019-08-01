"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("./Container"));
exports.Container = Container_1.default;
const types_1 = require("./types");
exports.TYPE_BINDING = types_1.TYPE_BINDING;
exports.TYPE_SINGLETON = types_1.TYPE_SINGLETON;
exports.TYPE_VALUE = types_1.TYPE_VALUE;
/**
 * Making a singleton Container
 *
 * @type {Container}
 */
exports.container = new Container_1.default();
/**
 * Bind a Symbol to the container
 */
exports.bind = (...dependencies) => (Target) => {
    Target.dependencies = dependencies;
    exports.container.autoBind(Target);
};
/**
 * Bind a Symbol to the container as a singleton
 */
exports.singleton = (...dependencies) => (Target) => {
    Target.dependencies = dependencies;
    exports.container.autoSingleton(Target);
};
/**
 * Bind a Symbol to the container as an Concrete of given Abstract
 */
exports.bindInversion = (AbstractSymbol, ...dependencies) => (Target) => {
    Target.dependencies = dependencies;
    exports.container.bindInversion(AbstractSymbol, Target);
};
/**
 * Bind a Symbol to the container as an Concrete of given Abstract as a singleton
 */
exports.singletonInversion = (AbstractSymbol, ...dependencies) => (Target) => {
    Target.dependencies = dependencies;
    exports.container.singletonInversion(AbstractSymbol, Target);
};
/**
 * Method decorator for injecting dependencies in to a class method
 */
exports.inject = (...dependencies) => (target, propertyKey, descriptor) => {
    const originValue = descriptor.value;
    descriptor.value = function (...args) {
        const deps = dependencies.map((d) => exports.container.make(d));
        return originValue.apply(this, [...args, ...deps]);
    };
};
//# sourceMappingURL=index.js.map