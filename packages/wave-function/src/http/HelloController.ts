import { singleton, get, Controller } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {


    @get('/')
    async index(context: Context) {
        context.render('hello', { message: "const energy = tokamak.fuse(ProtonPlasma);" });
    }
}
