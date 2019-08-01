import { Context, Middleware as KoaMiddleware } from "koa";
import { MiddlewareConstructor, Middleware } from "./Middleware";
/**
 * We'll support Class based middleware with the Handle method.
 */
export interface Middleware {
    handle(context: Context, next: Function): Promise<any>;
}
/**
 * Shape of such middleware
 */
export declare type MiddlewareConstructor = {
    new (...args: any[]): Middleware;
};
/**
 * Service for converting a Middleware class into standard Koa middleware
 *
 */
export declare class MiddlewareResolver {
    resolve(middleware: MiddlewareConstructor | Function): KoaMiddleware;
}
/**
 * Instance for globally uses.
 */
export declare const middlewareResolver: MiddlewareResolver;
