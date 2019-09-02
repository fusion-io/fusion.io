import {
    inject,
    Authenticator,
    UnAuthenticated,
    UnAuthorized,
    ErrorHandlerManager,
    JsonWebTokenIdentityProvider,
    Plasma as CorePlasma, Authorizer
} from "@fusion.io/proton";
import UserProvider from "./UserProvider";
import PostPolicy from "./PostPolicy";

export default class Plasma extends CorePlasma {

    @inject(Authenticator, UserProvider, Authorizer)
    compose(authenticator: Authenticator, userIDP: UserProvider, authorizer: Authorizer) {
        authenticator.connect('jwt.users', ({ privateKey }) => [
            new JsonWebTokenIdentityProvider(privateKey),
            userIDP
        ]);

        authenticator.connect('session.users', () => [userIDP]);

        authorizer.extends('post', new PostPolicy());
    }

    @inject(ErrorHandlerManager)
    boot(handler: ErrorHandlerManager) {
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