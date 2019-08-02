import { Plasma as CorePlasma } from "@fusion.io/core";
import interactsWithKernel from "./interactsWithKernel";
import interactsWithRouter from "./interactsWithRouter";
import interactsWithI18N from "./interactsWithI18N";
import interactsWithAuthenticator from "./interactsWithAuthenticator";

export default class Plasma extends CorePlasma {

    compose() {
        if (!this.tokamak.bound('services.nunjucks')) {
            return;
        }

        const view: any = this.tokamak.make('services.nunjucks');


        interactsWithKernel(view);
        interactsWithRouter(view);
        interactsWithI18N(view);
        interactsWithAuthenticator(view);

    }
}
