import {singleton, get, authenticate, authorize} from "@fusion.io/proton";
import { Context } from "koa";
import User from "../User";

@singleton()
export default class HelloController {

    @get('/', authenticate('session.users'))
    async index(context: Context) {
        context.render('hello', { message: 'tokamak.fuse(ProtonPlasma);'});
    }

    @get('/logout')
    async logout(context: Context) {
        context.logout();
        context.redirect('/');
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
    async writePost(context: Context) {
        context.body = {
            updatePost: context.params.postId
        }
    }
    @get('/read/:postId', authenticate('session.users'), authorize('read', 'post'))
    async readPost(context: Context) {
        context.body = {
            updatePost: context.params.postId
        }
    }
    @get('/publish/:postId', authenticate('session.users'), authorize('publish', 'post'))
    async publishPost(context: Context) {
        context.body = {
            updatePost: context.params.postId
        }
    }
}
