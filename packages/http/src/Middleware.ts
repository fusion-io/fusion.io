import {Context, Middleware as KoaMiddleware} from "koa";
import {container} from "@fusion.io/container";
import {MiddlewareConstructor, Middleware} from "./Middleware";

export interface Middleware {
    handle(context: Context, next: Function): Promise<any>;
}

export type MiddlewareConstructor = {
    new: (...args: any[]) => Middleware
}


export class MiddlewareResolver {
    resolve(middleware: MiddlewareConstructor|Function): KoaMiddleware {

        if ('function' === typeof middleware) {
            return middleware as KoaMiddleware;
        }

        const instance = container.make<Middleware>(middleware);

        return (context: Context, next: Function) => instance.handle(context, next)
    }
}
