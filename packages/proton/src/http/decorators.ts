declare type availableMethods = "get" | "post" | "put" | "patch" | "del";

/**
 * Decorates a route action for the controller
 *
 * @param method
 * @param url
 * @param middlewares
 */
export const route = (method: availableMethods, url: string, ...middlewares: Function[]) => {

    return (target: any, action: string) => {
        if (!target.constructor.routes) {
            target.constructor.routes = [];
        }
        target.constructor.routes.push({method, url, action, middlewares});
    }
};

/**
 * Decorates a get route
 *
 * @param url
 * @param middlewares
 */
export const get    = (url: string, ...middlewares: Function[]) => route('get', url, ...middlewares);

/**
 * Decorates a post route
 *
 * @param url
 * @param middlewares
 */
export const post   = (url: string, ...middlewares: Function[]) => route('get', url, ...middlewares);

/**
 * Decorates a put route
 *
 * @param url
 * @param middlewares
 */
export const put    = (url: string, ...middlewares: Function[]) => route('get', url, ...middlewares);

/**
 * Decorates a patch route
 *
 * @param url
 * @param middlewares
 */
export const patch  = (url: string, ...middlewares: Function[]) => route('get', url, ...middlewares);

/**
 * Decorates a delete route
 *
 * @param url
 * @param middlewares
 */
export const del    = (url: string, ...middlewares: Function[]) => route('get', url, ...middlewares);
