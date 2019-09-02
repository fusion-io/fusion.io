import {singleton, get, authenticate, validate, authorize} from "@fusion.io/proton";
import { Context } from "koa";
import User from "../User";
import AjvValidator from "./AjvValidator";

@singleton()
export default class HelloController {

    @get('/')
    async index(context: Context) {
        context.render('hello', { message: 'tokamak.fuse(ProtonPlasma);'});
    }

    @get('/logout')
    async logout(context: Context) {
        context.logout();
        // context.redirectTo('HelloController.index');
    }

    @get('/login')
    async login(context: Context) {
        context.login(new User({ roles: []}));
        context.body = {
            ok: 'ok'
        }
    }

    @get('/permissions')
    async permissions(context: Context) {
        context.body = {
            view: context.session.views
        }
    }

    @get('/write/:postId', authenticate('session.users'), authorize('write', 'post'))
    async readPost(context: Context) {
        context.body = {
            updatePost: context.params.postId
        }
    }
}
