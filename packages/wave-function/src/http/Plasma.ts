import { inject, Plasma as CorePlasma, Kernel, Router } from "@fusion.io/proton";
import HelloController from "./HelloController";
import { Subscriber } from "@fusion.io/bus";
import FoobarController from "./FoobarController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router, Subscriber)
    boot(kernel: Kernel, router: Router, sub: Subscriber) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());
        router
            .controller(HelloController)
            .controller(FoobarController)
        ;
    }
}
