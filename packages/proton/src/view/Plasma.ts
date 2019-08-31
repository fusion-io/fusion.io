import { Plasma as CorePlasma } from "@fusion.io/core";
import { Plasma as HandlebarsPlasma } from "@fusion.io/integrations-handlebars";

export default class Plasma extends CorePlasma {
    compose(): void {
        this.tokamak.fuse(HandlebarsPlasma);
    }
}
