import { Plasma as CorePlasma, inject, Kernel, Router } from "@fusion.io/proton";
import HelloController from "./HelloController";
import { authenticator } from "@fusion.io/authenticate";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router)
    boot(kernel: Kernel, router: Router) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router.controller(HelloController);

        router.get('/facebook', authenticator.guard('facebook'));
    }
}
