import KoaRouter from "koa-router";
import Controller, { ControllerConstructor } from "./Controller";
import { container } from "@fusion.io/container";
import { middlewareResolver } from "./Middleware";


/**
 * Shape of the Route Group factory
 */
export type GroupCallback = (router: Router) => any;

/**
 * We'll extends Koa
 */
export default class Router extends KoaRouter {

    /**
     * Register a route by controller
     *
     * @param Constructor
     */
    public controller(Constructor: ControllerConstructor) {
        const controller: Controller     = container.make<Controller>(Constructor);
        const controllerLevelMiddlewares = Constructor.middlewares.map(middleware => middlewareResolver.resolve(middleware));

        const routes    = Constructor.routes;

        routes.forEach(route => {

            const actionLevelMiddlewares = route.middlewares.map(mw => middlewareResolver.resolve(mw));

            // @ts-ignore
            return this[route.method](
                `${Controller.name}.${route.action}`,
                route.url,
                ...controllerLevelMiddlewares,
                ...actionLevelMiddlewares,
                controller.wrap(route.action)
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
