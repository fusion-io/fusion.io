import KoaRouter from "koa-router";
import { ControllerConstructor, RouteDefinition } from "./Controller";
import { tokamak, singleton } from "@fusion.io/core";

/**
 * Shape of the Route Group factory
 */
export type GroupCallback = (router: Router) => any;

/**
 * We'll extends Koa
 */
@singleton()
export default class Router extends KoaRouter {

    /**
     * Register a route by controller
     *
     * @param Constructor
     */
    public controller(Constructor: ControllerConstructor|any): Router {
        const controller: any = tokamak.make<any>(Constructor);
        const controllerLevelMiddlewares = Constructor.middlewares || [];

        const routes = Constructor.routes;

        routes.forEach((route: RouteDefinition) => {

            const actionLevelMiddlewares = route.middlewares;

            // @ts-ignore
            return this[route.method](
                `${Constructor.name}.${route.action}`,
                route.url,
                ...controllerLevelMiddlewares,
                ...actionLevelMiddlewares,
                (context, next) => controller[route.action](context, next)
            );
        });

        return this;
    }

    /**
     *
     * @param name
     * @param args
     */
    public get(name:string, ...args: any[]): any {
        super.get(name, ...args);
        return this;
    }

    /**
     *
     * @param name
     * @param args
     */
    public post(name:string, ...args: any[]): any {
        super.post(name, ...args);
        return this;
    }

    /**
     *
     * @param name
     * @param args
     */
    public put(name:string, ...args: any[]): any {
        super.put(name, ...args);
        return this;
    }

     /**
     *
     * @param name
     * @param args
     */
    public patch(name:string, ...args: any[]): any {
        super.patch(name, ...args);
        return this;
    }

    /**
     *
     * @param name
     * @param args
     */
    public delete(name:string, ...args: any[]): any {
        super.delete(name, ...args);
        return this;
    }

    /**
     * Group the routes. So we can apply configuration easier
     *
     * @param callback
     */
    public group(callback: GroupCallback) {
        const groupRouter = new Router();
        callback(groupRouter);

        this.use(groupRouter.routes());

        return this;
    }
}
