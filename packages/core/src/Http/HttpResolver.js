import {container, singleton} from "@fusion.io/container";
import lodash from "lodash";
import RouteDefinitions from "./RouteDefinitions";

@singleton()
export default class HttpResolver {

    /**
     * Resolve to standard koa middleware functions from a given Symbol
     *
     * @param MiddlewareSymbol
     * @return Array
     */
    resolveMiddleware(MiddlewareSymbol) {

        let middleware = MiddlewareSymbol;

        // Try to resolve the middleware
        if (container.bound(MiddlewareSymbol)) {
            // If the Symbol itself can be resolve, we'll use it
            middleware = container.make(MiddlewareSymbol);
        } else if (
            // Or try to resolve the middleware as a registered group
            lodash.isString(MiddlewareSymbol) &&
            container.bound(HttpResolver.makeKeyNameForMiddlewareGroup(MiddlewareSymbol))
        ) {
            middleware = container.make(HttpResolver.makeKeyNameForMiddlewareGroup(MiddlewareSymbol));
        }

        // If the given middleware is an array,
        // it indicates that we are having a middleware group.
        // We'll resolve each entry of the group.
        if (lodash.isArray(middleware)) {

            // Flatten the middlewares. This one is a recursive process
            // So we might have a nested middleware group
            return lodash.flatten(middleware.map(entry => this.resolveMiddleware(entry)));
        }

        // If the middleware has the #handle() method, it indicates that
        // we are having a Class middleware.
        if (lodash.isFunction(middleware.handle)) {
            return [(context, next) => middleware.handle(context, next)];
        }

        // If the middleware itself is a function, it should be an inline
        // middleware.
        if (lodash.isFunction(middleware)) {
            return [middleware];
        }

        // Otherwise, we'll not consider it as a middleware
        throw new Error(`E_HTTP_RESOLVER: [${middleware}] is not a middleware`);
    }

    /**
     *
     * @param ControllerSymbol
     * @return {RouteDefinitions}
     */
    resolveController(ControllerSymbol) {

        // Reading the signatures
        const routesSignature       = ControllerSymbol.routes || [];
        const middlewaresSignature  = ControllerSymbol.middlewares || { '*': [] };
        const routeNamesSignature   = ControllerSymbol.routeNames || {};

        // Extract the controller level middleware first
        const controllerLevelMiddlewares = middlewaresSignature['*'] || [];

        // With each route signature, we map it back to have a cleaner route definition
        const definitions = routesSignature.map(routeSignature => {
            const {action, method, url}     = routeSignature;
            const actionLevelMiddlewares    = middlewaresSignature[action] || [];
            const name                      = routeNamesSignature[action] ||
                this.getDefaultRouteName(ControllerSymbol.name, action);

            return {
                method: method.toLowerCase(),
                url,
                name,
                handler: this.wrapToRouteHandler(ControllerSymbol, routeSignature),

                // We'll combine middlewares from the controller definition
                // and action definition and resolve them.
                middlewares: this.resolveMiddleware([
                    ...controllerLevelMiddlewares,
                    ...actionLevelMiddlewares
                ])
            };
        });

        return new RouteDefinitions(definitions);
    }

    /**
     *
     * @param ControllerSymbol
     * @param action
     * @return {string}
     */
    getDefaultRouteName(ControllerSymbol, action) {
        return `${ControllerSymbol}.${action}`;
    }

    /**
     * Wrap a Controller#action into a standard Koa controller function
     *
     * @param ControllerSymbol
     * @param routeSignature
     * @return {function(*=, *=): *}
     */
    wrapToRouteHandler(ControllerSymbol, routeSignature) {
        return (context, next) => {
            const {methodDependencies, action} = routeSignature;

            const resolvedDependencies = methodDependencies
                .map(dependency => container.make(dependency))
            ;

            // Support method injection in the controller
            return container.invoke(ControllerSymbol, action, context, next, ...resolvedDependencies)
        }
    }

    static makeKeyNameForMiddlewareGroup(groupName) {
        return `Http.Kernel.MiddlewareGroup.${groupName}`;
    }
}

/**
 * Decorate the middleware signature
 *
 * @param middlewares
 * @return {Function}
 */
export const middleware = (...middlewares) => (controller, action, description) => {
    if (description) {
        /// this is the method decorator
        if (!controller.constructor.middlewares) {
            controller.constructor.middlewares = {};
        }

        controller.constructor.middlewares = { ...controller.constructor.middlewares, [action]: middlewares};
    } else {
        /// this is class decorator
        if (!controller.middlewares) {
            controller.middlewares = { };
        }

        controller.middlewares = { ...controller.middlewares, '*': middlewares }
    }
};

/**
 * Route signature decorator
 *
 */
export const route = (method, url, ...methodDependencies) => (controller, action) => {
    const registeredRoutes = controller.constructor.routes || [];

    registeredRoutes.push({action, method, url, methodDependencies});

    controller.constructor.routes = registeredRoutes;
};

export const get    = (url, ...methodDependencies) => route('get'   , url, ...methodDependencies);
export const put    = (url, ...methodDependencies) => route('put'   , url, ...methodDependencies);
export const post   = (url, ...methodDependencies) => route('post'  , url, ...methodDependencies);
export const patch  = (url, ...methodDependencies) => route('patch' , url, ...methodDependencies);
export const del    = (url, ...methodDependencies) => route('delete', url, ...methodDependencies);
export const all    = (url, ...methodDependencies) => route('all'   , url, ...methodDependencies);

/**
 * Route name signature decorator
 *
 * @param name
 * @return {Function}
 */
export const routeName = name => (target, method) => {
    let routeNames = target.constructor.routeNames || {};

    routeNames[method] = name;

    target.constructor.routeNames = routeNames;
};
