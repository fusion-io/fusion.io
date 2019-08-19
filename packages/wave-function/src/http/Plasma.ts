import { inject, Plasma as CorePlasma, Kernel, Router } from "@fusion.io/proton";
import HelloController from "./HelloController";
import { Subscriber } from "@fusion.io/bus";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router, Subscriber)
    boot(kernel: Kernel, router: Router, sub: Subscriber) {

        sub.subscribe('xx', async (message: any) => console.log(message));

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());
        router.controller(HelloController);
    }
}
