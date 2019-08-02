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

/**
 * Base controller
 *
 */
export default abstract class Controller {

    /**
     * List of the middlewares
     */
    public static middlewares: Middleware[] = [];

    /**
     * List of the routes
     */
    public static routes: RouteDefinition[] = [];

    /**
     * List of the dependencies. This is a work around to make sure
     * the controller is injectable.
     */
    public static dependencies:DependencyKey[] = [];

    /**
     * Wraps an action and converts it into a Koa Layer
     *
     * @param action
     */
    public wrap(action: string) {

        // @ts-ignore
        const routeAction = this[action];

        return (context: Context, next: Function) => routeAction.call(this, context, next);
    }
}
