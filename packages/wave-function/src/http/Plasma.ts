import { inject, Plasma as CorePlasma, Kernel, Router } from "@fusion.io/proton";

import HelloController from "./HelloController";
import FoobarController from "./FoobarController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router)
    boot(kernel: Kernel, router: Router) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router
            .controller(HelloController)
            .controller(FoobarController)
        ;
    }
}
