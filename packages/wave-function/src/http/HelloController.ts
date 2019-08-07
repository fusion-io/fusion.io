import { singleton, get, Controller, authenticator } from "@fusion.io/proton";
import { Context } from "koa";

@singleton()
export default class HelloController extends Controller {


    @get('/')
    async index(context: Context) {
        context.render('hello', { message: 'Yo! Let\'s Nuke!' });
    }

    @get('/facebook/callback', authenticator.guard('facebook.user'))
    async facebook(context: Context) {
        context.body = {
            identity: context.identity
        }
    }

    @get('/login/facebook', authenticator.guard('facebook.user'))
    async facebookAuthorize() {
        // TODO nothing here
    }

    @get('/jwt', authenticator.guard('jwt'))
    async jwt(context: Context) {
        context.body = {
            identity: context.identity
        }
    }
}
