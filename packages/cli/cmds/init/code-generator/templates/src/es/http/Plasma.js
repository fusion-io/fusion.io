import {Plasma as CorePlasma, inject, Kernel, Router} from "@fusion.io/proton";
import HelloController from "./HelloController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router)
    boot(kernel, router) {


        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router.controller(HelloController);
    }
}
