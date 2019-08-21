import { singleton, get, authenticate, authorize, inject } from "@fusion.io/proton";
import { Context } from "koa";
import { Publisher } from "@fusion.io/bus";

@singleton()
export default class HelloController {

    @get('/', authenticate('jwt.users'), authorize('view'))
    async index(context: Context) {
        context.body = {message: "tokamak.fuse(ProtonPlasma);"};
    }

    @get('/permissions')
    async permissions(context: Context) {

        context.body = {
            message: 'ok'
        }
    }
}
