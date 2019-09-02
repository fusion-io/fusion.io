import {inject, Plasma as CorePlasma, Kernel, Router, Validator} from "@fusion.io/proton";

import HelloController from "./HelloController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router, Validator)
    boot(kernel: Kernel, router: Router, validator: Validator) {

        kernel.use(require('koa-session')({
            key: 'koa:sess',
            autoCommit: true
        }, kernel));

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router
            .controller(HelloController)
        ;
    }
}
