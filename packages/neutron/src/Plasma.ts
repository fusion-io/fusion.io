import { inject, Plasma as CorePlasma } from "@fusion.io/proton";
import { ConsoleKernel } from "@fusion.io/commands";
import Neutron from "./commands/Neutron";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel)
    compose(console: ConsoleKernel) {

        console.register(Neutron);
    }
}
