import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import Router from "./Router";
import Kernel from "./Koa";
import handleError from "./handleError";

export default class Plasma extends CorePlasma {

    @inject(Router, Kernel)
    compose(router: Router, kernel: Kernel) {

        const { debug, keys } = this.config;

        if (debug) {
            kernel.use(handleError);
        }

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        kernel.keys = keys;
    }
}
