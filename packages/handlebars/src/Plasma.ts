import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import Environment from "./Environment";

export default class Plasma extends CorePlasma {

    @inject(Environment)
    compose(env: Environment) {
        env.loadViews(this.config.view.directory);
    }
}
