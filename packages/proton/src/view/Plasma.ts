import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { Environment, Plasma as HandlebarsPlasma } from "@fusion.io/integrations-handlebars";
import { Kernel } from "../http";
import renderView from "./renderView";
import Router from "../http/Router";

export default class Plasma extends CorePlasma {

    @inject(Router, Environment)
    compose(router: Router, env: Environment): void {
        this.tokamak.fuse(HandlebarsPlasma);

        const engine = env.getHandlebars();

        engine.registerHelper({
            url: (path, { hash }) =>  Router.url(path, hash),
            route: (name, { hash }) => router.url(name, hash)
        });
    }

    @inject(Kernel)
    boot(kernel: Kernel) {
        kernel.use(renderView);
    }
}
