import KoaRouter from "koa-router";
import Controller, { ControllerConstructor } from "./Controller";
import { container } from "@fusion.io/container";
import {MiddlewareResolver} from "./Middleware";

const resolver = new MiddlewareResolver();

export type GroupCallback = (router: Router) => any;

export default class Router extends KoaRouter {

    public controller(Constructor: ControllerConstructor) {
        const controller: Controller     = container.make<Controller>(Constructor);
        const controllerLevelMiddlewares = Constructor.middlewares.map(middleware => resolver.resolve(middleware));

        const routes    = Constructor.routes;

        routes.forEach(route => {

            const actionLevelMiddlewares = route.middlewares.map(mw => resolver.resolve(mw));

            this[route.method](
                // `${Controller.name}.${route.action}`,
                route.url,
                ...controllerLevelMiddlewares,
                ...actionLevelMiddlewares,
                controller.wrap(route.action)
            );
        });

        return this;
    }

    public group(callback: GroupCallback) {
        const groupRouter = new Router();
        callback(groupRouter);

        this.use(groupRouter.routes());

        return this;
    }
}
