import {Environment, FileSystemLoader} from "nunjucks";
import {container} from "@fusion.io/core";
import {Config, View} from "../../serviceLocator";

import interactsWithKernel from "./interactsWithKernel";
import interactsWithRouter from "./interactsWithRouter";
import interactsWithI18N from "./interactsWithI18N";
import interactsWithAuthenticator from "./interactsWithAuthenticator";

export const plasma = {

    compose: () => {
        const { view } = container.make(Config);

        container.value(View, new Environment(new FileSystemLoader(view)));
    },

    boot: () => {
        const view = container.make<Environment>(View);

        interactsWithKernel(view);
        interactsWithRouter(view);
        interactsWithI18N(view);
        interactsWithAuthenticator(view);
    }
};
