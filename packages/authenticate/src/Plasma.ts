import { tokamak, Plasma as CorePlasma } from "@fusion.io/core";
import { Authenticator } from "./Authenticator";

const authenticator = new Authenticator();

tokamak.singleton(Authenticator, () => authenticator);

export {
    authenticator
};

export class Plasma extends CorePlasma {

    boot() {
        const { authentication } = this.config;

        authenticator.bootstrap(authentication);
    }
}
