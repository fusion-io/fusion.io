import {inject, Plasma as CorePlasma} from "@fusion.io/core";
import interactsWithKernel from "./interactsWithKernel";
import interactsWithRouter from "./interactsWithRouter";
import interactsWithI18N from "./interactsWithI18N";
import interactsWithAuthenticator from "./interactsWithAuthenticator";
import Environment from "./Environment";

export default class Plasma extends CorePlasma {

    @inject(Environment)
    compose(view: Environment) {
        interactsWithKernel(view);
        interactsWithRouter(view);
        interactsWithI18N(view);
        interactsWithAuthenticator(view);
    }
}
