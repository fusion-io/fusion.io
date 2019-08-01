"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Decorates a route action for the controller
 *
 * @param method
 * @param url
 * @param middlewares
 */
exports.route = (method, url, ...middlewares) => {
    return (target, action) => {
        // @ts-ignore
        target.constructor.routes.push({ method, url, action, middlewares });
    };
};
/**
 * Decorates a get route
 *
 * @param url
 * @param middlewares
 */
exports.get = (url, ...middlewares) => exports.route('get', url, ...middlewares);
/**
 * Decorates a post route
 *
 * @param url
 * @param middlewares
 */
exports.post = (url, ...middlewares) => exports.route('get', url, ...middlewares);
/**
 * Decorates a put route
 *
 * @param url
 * @param middlewares
 */
exports.put = (url, ...middlewares) => exports.route('get', url, ...middlewares);
/**
 * Decorates a patch route
 *
 * @param url
 * @param middlewares
 */
exports.patch = (url, ...middlewares) => exports.route('get', url, ...middlewares);
/**
 * Decorates a delete route
 *
 * @param url
 * @param middlewares
 */
exports.del = (url, ...middlewares) => exports.route('get', url, ...middlewares);
//# sourceMappingURL=decorators.js.map