import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import Environment from "./Environment";
import Handlebars from "handlebars";

export default class Plasma extends CorePlasma {

    @inject(Environment)
    compose(env: Environment) {
        Handlebars.registerHelper(require('handlebars-helpers')());

        env.loadViews(this.config.view.directory);
    }
}
