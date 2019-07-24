import KoaRouter from "koa-router";

export default class Router extends KoaRouter{

    constructor(options, resolver) {
        super(options);
        this.resolver = resolver;
    }

    controller(ControllerSymbol) {
        const controllerRoutes = this.resolver.resolveController(ControllerSymbol);
        controllerRoutes.apply(this);

        return this;
    }

    use(middleware) {
        const resolved = this.resolver.resolveMiddleware(middleware);
        super.use(...resolved);

        return this;
    }

    group(options, routeGroup) {
        const subRouter = new Router(options, this.resolver);

        subRouter.use(options.middleware || []);

        routeGroup(subRouter);

        this.use(subRouter.routes());

        return this;
    }
}
