import {Controller, route} from "@fusion.io/http";
import {Context} from "koa";
import {singleton} from "@fusion.io/container";

@singleton()
export default class HelloWorldController extends Controller {
    @route('get', '/')
    index(context: Context) {
        context.body = {
            hello: 'world'
        }
    }
}
