import { inject, Plasma as CorePlasma } from "@fusion.io/proton";
import { APIPlasma } from "@fusion.io/neutron";

export default class Plasma extends APIPlasma {

    boot() {
        this.supporting('v1', [
            // List of your Api Controller here
        ]);
    }
}
