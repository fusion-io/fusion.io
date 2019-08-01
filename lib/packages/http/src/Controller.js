"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base controller
 *
 */
class Controller {
    /**
     * Wraps an action and converts it into a Koa Layer
     *
     * @param action
     */
    wrap(action) {
        // @ts-ignore
        const routeAction = this[action];
        return (context, next) => routeAction.call(this, context, next);
    }
}
/**
 * List of the middlewares
 */
Controller.middlewares = [];
/**
 * List of the routes
 */
Controller.routes = [];
/**
 * List of the dependencies. This is a work around to make sure
 * the controller is injectable.
 */
Controller.dependencies = [];
exports.default = Controller;
//# sourceMappingURL=Controller.js.map