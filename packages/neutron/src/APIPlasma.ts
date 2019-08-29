import { inject, Plasma, Router } from "@fusion.io/proton";

export default class APIPlasma extends Plasma {

    supporting(apiVersion: string, controllers: any[]) {
        const router = this.tokamak.make<Router>(Router);

        router.group((subRouter) => {
            subRouter.prefix(`/api/${apiVersion}`);

            controllers.forEach(ControllerConstructor => router.controller(ControllerConstructor))
        });

        return this;
    }
}
