import { Plasma as CorePlasma, inject } from "@fusion.io/proton";
import {Authenticator, createFacebookKoaGateway, createJWTKoaGateway} from "@fusion.io/authenticate";
import DummyUserProvider from "./DummnyUserProvider";


export default class Plasma extends CorePlasma {

    @inject(Authenticator)
    compose(authenticator: Authenticator) {
        authenticator
            .supporting('facebook',(options) => createFacebookKoaGateway(options, new DummyUserProvider()))
            .supporting('jwt', options => createJWTKoaGateway(options, new DummyUserProvider()))
    }
}
