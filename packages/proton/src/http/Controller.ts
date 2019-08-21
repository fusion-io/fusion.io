import { Context, Middleware } from "koa";
import { DependencyKey } from "@fusion.io/core";

/**
 * The metadata about routing of the controller
 */
export type RouteDefinition = {
    method      : "get" | "post" | "put" | "patch" | "del",
    url         : string,
    action      : string,
    middlewares : []
}

/**
 * Shape of the Constructor of the controller
 */
export type ControllerConstructor = {
    middlewares: Middleware[],
    routes: RouteDefinition[],
    dependencies: DependencyKey[]
}
