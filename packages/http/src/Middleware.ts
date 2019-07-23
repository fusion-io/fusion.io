import { Context, Middleware as KoaMiddleware } from "koa";
import { container } from "@fusion.io/container";
import {MiddlewareConstructor, Middleware} from "./Middleware";

/**
 * We'll support Class based middleware with the Handle method.
 */
export interface Middleware {
    handle(context: Context, next: Function): Promise<any>;
}

/**
 * Shape of such middleware
 */
export type MiddlewareConstructor = {
    new (...args: any[]): Middleware
}

/**
 * Service for converting a Middleware class into standard Koa middleware
 *
 */
export class MiddlewareResolver {
    resolve(middleware: MiddlewareConstructor|Function): KoaMiddleware {

        // If it is not registered in our container.
        // It might be an inline middleware function.
        if (!container.bound(middleware)) {
            return middleware as KoaMiddleware;
        }

        // Otherwise
        const instance = container.make<Middleware>(middleware);

        return (context: Context, next: Function) => instance.handle(context, next)
    }
}

/**
 * Instance for globally uses.
 */
export const middlewareResolver = new MiddlewareResolver();