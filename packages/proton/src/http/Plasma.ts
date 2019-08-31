import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import Router from "./Router";
import Kernel from "./Kernel";
import handleError from "./handleError";
import ErrorHandlerManager from "./ErrorHandlerManager";

export default class Plasma extends CorePlasma {

    @inject(Router, Kernel, ErrorHandlerManager)
    compose(router: Router, kernel: Kernel, handler: ErrorHandlerManager) {

        const { debug, keys } = this.config;

        kernel.keys = keys;

        if (debug) kernel.use(handleError);

        kernel.use(handler.middleware());
    }
}
