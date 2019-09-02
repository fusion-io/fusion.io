import {singleton, get, authenticate, authorize, inject, Authorizer, AuthorizationContext} from "@fusion.io/proton";
import { Context } from "koa";
import User from "../User";

@singleton()
export default class HelloController {

    @get('/')
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

    @inject(Authorizer)
    @get('/permissions/:postId', authenticate('session.users'))
    async permissions(context: Context, next: Function, authorizer: Authorizer) {
        context.body = {
            permissions: await authorizer.granted({ ...context, identity: context.identity}, 'post')
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
