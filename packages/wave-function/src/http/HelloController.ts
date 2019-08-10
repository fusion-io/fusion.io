import { singleton, get, Controller, authenticate, authorize } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {

    @get('/', authenticate('token.users'), authorize('view', 'message'))
    async index(context: Context) {
        context.body = { message: "tokamak.fuse(ProtonPlasma);" };
    }
}
