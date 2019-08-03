import { singleton, get, Controller, authenticator } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {


    @get('/message/hello')
    async index(context: Context) {
        context.render('hello', { message: 'Hello World' });
    }

    @get('/facebook/callback', authenticator.guard('facebook'))
    async facebook(context: Context) {
        context.body = {
            identity: context.identity
        }
    }

    @get('/jwt', authenticator.guard('jwt'))
    async jwt(context: Context) {
        context.body = {
            identity: context.identity
        }
    }
}
