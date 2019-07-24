import { Context } from "koa";
export default class SayHelloMiddleware {
    handle(context: Context, next: Function): Promise<void>;
}
