import { inject, Plasma as CorePlasma, Kernel, Router, Validator } from "@fusion.io/proton";
import { Context } from "koa";

import HelloController from "./HelloController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router, Validator)
    boot(kernel: Kernel, router: Router, validator: Validator) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router.group(webRouter => {
            webRouter.use(require('koa-session')(kernel));
            webRouter.controller(HelloController)
        });

        router.group(apiRouter => {
            apiRouter.prefix('/api/v1');
            apiRouter.get('/metadata', (context: Context) => {
                context.body = { version: '1.0' }
            });
        })
    }
}
