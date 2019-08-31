import { inject, Plasma as CorePlasma, Kernel, Router } from "@fusion.io/proton";
import { Environment, renderView } from "@fusion.io/integrations-handlebars";
import { Subscriber } from "@fusion.io/bus";

import HelloController from "./HelloController";
import FoobarController from "./FoobarController";

export default class Plasma extends CorePlasma {

    @inject(Kernel, Router, Subscriber, Environment)
    boot(kernel: Kernel, router: Router, sub: Subscriber, env: Environment) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router
            .controller(HelloController)
            .controller(FoobarController)
        ;

        this.bootView(env);
    }

    bootView(env: Environment) {
        env.rendering('hello', async (context, next) => {
            context.posts = await context.user.posts();
            await next();
        });
    }
}
