import { singleton, get, Controller, authenticate, authorize, inject, Authorizer } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {

    @get('/', authenticate('jwt.users'), authorize('view'))
    async index(context: Context) {
        context.body = {message: "tokamak.fuse(ProtonPlasma);"};
    }

    @inject(Authorizer)
    @get('/permissions', authenticate('jwt.users'))
    async permissions(context: Context, next: Function, authorizer: Authorizer) {
        context.body = await authorizer.granted(context.identity)
    }
}
