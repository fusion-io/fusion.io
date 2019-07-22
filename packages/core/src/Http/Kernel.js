import Koa from "koa";

export default class Kernel extends Koa {
    constructor(resolver) {
        super();

        this.resolver = resolver;
    }

    use(middleware) {
        const resolved = this.resolver.resolveMiddleware(middleware);

        super.use(...resolved);
    }
}
