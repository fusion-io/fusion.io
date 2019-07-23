import {Router, Controller, get} from "@fusion.io/http";
import {singleton} from "@fusion.io/core";
import {Context} from "koa";

@singleton()
class HelloController extends Controller {

    @get('/')
    index(context: Context) {
        context.body = {
            hello: 'world'
        }
    }
}

export const plasma = {
    dependencies: [Router],

    bootstrapper: (router: Router) => {
        router.controller(HelloController);
    }
};
