"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fusion.io/core");
/**
 * Service for converting a Middleware class into standard Koa middleware
 *
 */
class MiddlewareResolver {
    resolve(middleware) {
        // If it is not registered in our container.
        // It might be an inline middleware function.
        if (!core_1.container.bound(middleware)) {
            return middleware;
        }
        // Otherwise
        const instance = core_1.container.make(middleware);
        return (context, next) => instance.handle(context, next);
    }
}
exports.MiddlewareResolver = MiddlewareResolver;
/**
 * Instance for globally uses.
 */
exports.middlewareResolver = new MiddlewareResolver();
//# sourceMappingURL=Middleware.js.map