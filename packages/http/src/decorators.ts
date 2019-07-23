import {Middleware} from "koa";
import Controller from "./Controller";

declare type availableMethods = "get" | "post" | "put" | "patch" | "del";

export const route = (method: availableMethods, url: string, ...middlewares: Middleware[]) => {

    return (target: Controller, action: string) => {

        // @ts-ignore
        target.constructor.routes.push({method, url, action, middlewares});
    }
};
