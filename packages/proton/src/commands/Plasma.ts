import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { ConsoleKernel } from "@fusion.io/commands";
import Routes from "./Routes";

export default class Plasma extends CorePlasma {
    @inject(ConsoleKernel)
    compose(kernel: ConsoleKernel) {
        kernel.register(Routes);
    }
}
