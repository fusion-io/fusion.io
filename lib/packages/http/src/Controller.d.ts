import { Context } from "koa";
import { MiddlewareConstructor } from "./Middleware";
import { DependencyKey } from "@fusion.io/core";
/**
 * The metadata about routing of the controller
 */
export declare type RouteDefinition = {
    method: "get" | "post" | "put" | "patch" | "del";
    url: string;
    action: string;
    middlewares: [];
};
/**
 * Shape of the Constructor of the controller
 */
export declare type ControllerConstructor = {
    middlewares: (MiddlewareConstructor | Function)[];
    routes: RouteDefinition[];
    dependencies: DependencyKey[];
};
/**
 * Base controller
 *
 */
export default abstract class Controller {
    /**
     * List of the middlewares
     */
    static middlewares: (MiddlewareConstructor | Function)[];
    /**
     * List of the routes
     */
    static routes: RouteDefinition[];
    /**
     * List of the dependencies. This is a work around to make sure
     * the controller is injectable.
     */
    static dependencies: DependencyKey[];
    /**
     * Wraps an action and converts it into a Koa Layer
     *
     * @param action
     */
    wrap(action: string): (context: Context, next: Function) => any;
}
