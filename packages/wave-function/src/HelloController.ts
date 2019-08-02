import { singleton, get, Controller } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {


    @get('/message/hello')
    async index(context: Context) {
        throw new Error("Oops!");

        context.body = {
            'hello': 'world'
        };
    }
}
