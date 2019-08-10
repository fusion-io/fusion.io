import {
    inject,
    Authenticator,
    Gateway,
    IdentityProviderChain,
    JsonWebtokenIdentityProvider,
    KoaToken, UnAuthenticated,
    ErrorHandlerManager, UnAuthorized,
    Plasma as CorePlasma
} from "@fusion.io/proton";

import UserProvider from "./UserProvider";

export default class Plasma extends CorePlasma {

    @inject(Authenticator, ErrorHandlerManager)
    compose(authenticator: Authenticator, handler: ErrorHandlerManager) {

        authenticator.supporting('jwt', ({ privateKey }) => new Gateway(
            new KoaToken(),
            new IdentityProviderChain([
                new JsonWebtokenIdentityProvider(privateKey),
                new UserProvider()
            ])
        ));

        handler
            .willHandle(UnAuthenticated, async (error, context) => {
                context.status = 403;
                context.body = {
                    message: 'You must login first'
                }
            })
            .willHandle(UnAuthorized, async (error, context) => {
                context.status = 401;
                context.body = {
                    message: 'You are not authorized to perform this action'
                }
            })
        ;
    }
}