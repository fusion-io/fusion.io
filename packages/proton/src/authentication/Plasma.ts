import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import {
    Authenticator,
    Gateway,
    KoaToken,
    KoaOAuth2,
    KoaLocal,
    KoaSession,
    Plasma as AuthenticatePlasma
} from "@fusion.io/authenticate";
import Kernel from "../http/Kernel";
import Authenticable from "./Authenticable";

export class Plasma extends CorePlasma {

    @inject(Authenticator, Kernel)
    compose(authenticator: Authenticator, kernel: Kernel) {

        this.tokamak.fuse(AuthenticatePlasma);

        authenticator
            .supporting('proton.oauth2', options => new Gateway(new KoaOAuth2(options)))
            .supporting('proton.token', (() => new Gateway(new KoaToken())))
            .supporting('proton.local', options => new Gateway(new KoaLocal(options)))
            .supporting('proton.session', (() => new Gateway(new KoaSession('identity'))))
        ;

        kernel.use(async (context, next) => {
            context.login = (authenticable: Authenticable) => {
                context.session.identity = authenticable.identity();
            };
            context.logout = () => {
                delete context.session.identity;
            };
            await next();
        });
    }
}
