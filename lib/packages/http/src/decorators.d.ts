import Controller from "./Controller";
import { MiddlewareConstructor } from "./Middleware";
/**
 * Decorates a route action for the controller
 *
 * @param method
 * @param url
 * @param middlewares
 */
export declare const route: (method: "del" | "get" | "post" | "put" | "patch", url: string, ...middlewares: MiddlewareConstructor[]) => (target: Controller, action: string) => void;
/**
 * Decorates a get route
 *
 * @param url
 * @param middlewares
 */
export declare const get: (url: string, ...middlewares: any[]) => (target: Controller, action: string) => void;
/**
 * Decorates a post route
 *
 * @param url
 * @param middlewares
 */
export declare const post: (url: string, ...middlewares: any[]) => (target: Controller, action: string) => void;
/**
 * Decorates a put route
 *
 * @param url
 * @param middlewares
 */
export declare const put: (url: string, ...middlewares: any[]) => (target: Controller, action: string) => void;
/**
 * Decorates a patch route
 *
 * @param url
 * @param middlewares
 */
export declare const patch: (url: string, ...middlewares: any[]) => (target: Controller, action: string) => void;
/**
 * Decorates a delete route
 *
 * @param url
 * @param middlewares
 */
export declare const del: (url: string, ...middlewares: any[]) => (target: Controller, action: string) => void;
