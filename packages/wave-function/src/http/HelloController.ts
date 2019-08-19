import { singleton, get, Controller, authenticate, authorize, inject } from "@fusion.io/proton";
import { Context } from "koa";
import { Publisher } from "@fusion.io/bus";

@singleton()
export default class HelloController extends Controller {

    @get('/', authenticate('jwt.users'), authorize('view'))
    async index(context: Context) {
        context.body = {message: "tokamak.fuse(ProtonPlasma);"};
    }

    @inject(Publisher)
    @get('/permissions')
    async permissions(context: Context, next: Function, publisher: Publisher) {
        publisher.publish({
            channel: () => 'xx',
            as: () => 'fusion.message',
            payload: () => 'Hello world'
        });

        context.body = {
            message: 'ok'
        }
    }
}
