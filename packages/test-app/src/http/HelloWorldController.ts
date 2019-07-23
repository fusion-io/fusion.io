import {get, Controller, inject, singleton, authenticator} from "@fusion.io/core";
import {Context} from "koa";
import HelloWorldService from "./HelloWorldService";
import SayHelloMiddleware from "./SayHelloMiddleware";

@singleton()
export default class HelloWorldController extends Controller {

    @inject(HelloWorldService)
    @get('/', SayHelloMiddleware, authenticator.guard('token'))
    index(context: Context, next: Function, service: HelloWorldService) {
        context.body = {
            hello: 'world',
            message: service.run()
        }
    }
}
