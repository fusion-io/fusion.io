import {authenticator, router, Router} from "@fusion.io/core";
import {createKoaGateway as tokenGate} from "@fusion.io/authenticate/lib/gateways/jwt";
import {createKoaGateway as facebookGate} from "@fusion.io/authenticate/lib/gateways/facebook";
import IDP from "./IDP";
import HelloWorldController from "./HelloWorldController";
import {Context} from "koa";

export default {

    initial: () => {

    },

    bootstrap: () => {

        const idp = new IDP();

        authenticator
            .register('token', tokenGate('lUwW3BDj6gjt5TiCRjT50gfkiMImRcfd', idp))
            .register('facebook', facebookGate({
                clientId: '2414786412178829',
                clientSecret: '5978e8545dd482ae8f3af197fc190c3a',
                redirectUri: 'http://localhost:3000/facebook/callback'
            }, idp))
        ;

        router
            .get('/facebook', authenticator.guard('facebook'))
            .get('/facebook/callback', authenticator.guard('facebook'))
            // .controller(HelloWorldController)
            // .controller(FacebookController)
            // .get('/facebook', authenticator.guard('facebook'))
        ;


        router.group((groupRouter: Router) => {
            groupRouter.prefix('/api/v1')
                .get('/message', (context: Context) => {
                    context.body = {
                        'test': 'api'
                    }
                })
                .get('/message2', ((context: Context) => {
                    context.body = {
                        'test': 'api2'
                    }
                }))
        });
    }
}
