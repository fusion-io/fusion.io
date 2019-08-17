import {MessageConsumer} from "./SubscribeTransport";

export type Middleware = (message: any, next: Function) => Promise<void>

export default class ChannelControllerStack {

    constructor(private middlewares:Middleware[] = []) { }

    use(...middlewares: Middleware[]) {
        this.middlewares = this.middlewares.concat(middlewares);
        return this;
    }

    compile(): MessageConsumer {
        return this.middlewares.reduceRight((composed: Function, current: Middleware) => {
            return (message) => current(message, composed);
        }, message => message);
    }

    dispatch(message: any): Promise<void> {
        return this.compile()(message);
    }
}
