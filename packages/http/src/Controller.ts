import {Context} from "koa";
import {MiddlewareConstructor} from "./Middleware";
import {DependencyKey} from "@fusion.io/container";

export type RouteDefinition = {
    method      : "get" | "post" | "put" | "patch" | "del",
    url         : string,
    action      : string,
    middlewares : []
}

export type ControllerConstructor = {
    middlewares: (MiddlewareConstructor|Function)[],
    routes: RouteDefinition[],
    dependencies: DependencyKey[]
}

export default abstract class Controller {

    public static middlewares: (MiddlewareConstructor|Function)[] = [];
    public static routes: RouteDefinition[] = [];
    public static dependencies:DependencyKey[] = [];

    public wrap(action: string) {

        // @ts-ignore
        const routeAction = this[action];

        return (context: Context, next: Function) => routeAction(context, next);
    }
}
