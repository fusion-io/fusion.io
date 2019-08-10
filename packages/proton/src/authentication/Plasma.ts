import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import {
    Authenticator,
    Gateway,
    KoaToken,
    KoaOAuth2,
    KoaLocal,
    KoaSession
} from "@fusion.io/authenticate";

export class Plasma extends CorePlasma {

    @inject(Authenticator)
    compose(authenticator: Authenticator) {

        authenticator
            .supporting('proton.oauth2', options => new Gateway(new KoaOAuth2(options)))
            .supporting('proton.token', (() => new Gateway(new KoaToken())))
            .supporting('proton.local', options => new Gateway(new KoaLocal(options)))
            .supporting('proton.session', (options => new Gateway(new KoaSession(options))))
        ;
    }
}
