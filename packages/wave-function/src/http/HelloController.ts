import { singleton, get } from "@fusion.io/proton";
import { Context } from "koa";
import User from "../User";

@singleton()
export default class HelloController {

    @get('/')
    async index(context: Context) {
        context.render('hello', { message: 'tokamak.fuse(ProtonPlasma);', user: new User({ roles: ['foobar']})});
    }

    @get('/permissions')
    async permissions(context: Context) {

        context.body = {
            message: 'ok'
        }
    }
}
