import {
    Plasma as CorePlasma,
    inject, Authenticator, KoaOAuth2, Gateway,
    FacebookIdentityProvider, KoaToken, JsonWebtokenIdentityProvider
} from "@fusion.io/proton";

export default class Plasma extends CorePlasma {

    @inject(Authenticator)
    compose(authenticator: Authenticator) {
        authenticator
            .supporting('facebook', options => new Gateway(
                new KoaOAuth2(options.protocol),
                new FacebookIdentityProvider(options.idp)
            ))
            .supporting('jwt', options => new Gateway(
                new KoaToken(),
                new JsonWebtokenIdentityProvider(options)
            ))
        ;
    }
}
