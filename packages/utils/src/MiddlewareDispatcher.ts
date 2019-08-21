export type Middleware = (context: any, next: Function) => Promise<void>|void;

export class MiddlewareDispatcher {

    constructor(private middlewares: Middleware[] = []) { }

    use(...middlewares: Middleware[]) {
        this.middlewares = this.middlewares.concat(middlewares);
        return this;
    }

    dispatch(context: any) {
        return this.middlewares.reduceRight(
            (next, current) => () => current(context, next),
            () => {}
        )(context, () => {});
    }
}
