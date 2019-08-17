import { singleton, get, Controller, authenticate, authorize, inject, Authorizer } from "@fusion.io/proton";
import { Context } from "koa";
import { Publisher } from "@fusion.io/bus";
import HelloMessage from "../pubsub/HelloMessage";

@singleton()
export default class HelloController extends Controller {

    @get('/', authenticate('jwt.users'), authorize('view'))
    async index(context: Context) {
        context.body = { message: "tokamak.fuse(ProtonPlasma);" };
    }

    @inject(Authorizer)
    @get('/permissions', authenticate('jwt.users'))
    async permissions(context: Context, next: Function, authorizer: Authorizer) {
        context.body = await authorizer.granted(context.identity)
    }

    @inject(Publisher)
    @get('/publish')
    async publish(context: Context, next: Function, publisher: Publisher) {
        await publisher.publish(new HelloMessage('Hello World'));

        context.body = {
            message: 'ok'
        }
    }
}
