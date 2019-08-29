import { singleton, get } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController {

    @get('/')
    async index(context: Context) {
        context.render('hello', { message: "tokamak.fuse(ProtonPlasma);" });
    }
}
