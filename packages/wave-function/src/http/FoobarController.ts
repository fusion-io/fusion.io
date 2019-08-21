import {get, singleton} from "@fusion.io/proton";
import {Context} from "koa";

@singleton()
export default class FoobarController {

    @get('/foobar')
    index(context: Context) {
        context.body = {
            foo: 'bar'
        }
    }
}
