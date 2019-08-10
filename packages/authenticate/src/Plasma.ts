import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import { Authenticator } from "./Authenticator";

export default class Plasma extends CorePlasma {

    @inject(Authenticator)
    boot(authenticator: Authenticator) {
        const { authentication } = this.config;

        authenticator.bootstrap(authentication);
    }
}
