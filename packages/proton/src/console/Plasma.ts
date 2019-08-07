import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { ConsoleKernel } from "@fusion.io/commands";
import Proton from "./Proton";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel)
    compose(console: ConsoleKernel): void {
        console.register(Proton);
    }
}
