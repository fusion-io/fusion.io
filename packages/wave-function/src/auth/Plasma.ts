import {
    inject,
    Authenticator,
    UnAuthenticated,
    UnAuthorized,
    ErrorHandlerManager,
    JsonWebTokenIdentityProvider,
    Plasma as CorePlasma
} from "@fusion.io/proton";
import UserProvider from "./UserProvider";

export default class Plasma extends CorePlasma {

    @inject(Authenticator, ErrorHandlerManager, UserProvider)
    compose(authenticator: Authenticator, handler: ErrorHandlerManager, userIDP: UserProvider) {

        authenticator.connect('jwt.users', ({ privateKey }) => [
            new JsonWebTokenIdentityProvider(privateKey),
            userIDP
        ]);

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