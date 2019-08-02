import { singleton, get, Controller, inject } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {


    @get('/message/hello')
    async index(context: Context) {
        context.render('hello', { message: 'Hello World' });
    }
}
