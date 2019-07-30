import {Environment} from "nunjucks";
import {container} from "@fusion.io/core";
import {Config, View} from "../../serviceLocator";

import interactsWithKernel from "./interactsWithKernel";
import interactsWithRouter from "./interactsWithRouter";
import interactsWithI18N from "./interactsWithI18N";
import interactsWithAuthenticator from "./interactsWithAuthenticator";
import DotNotationLoader from "./DotNotationLoader";

export const plasma = {

    compose: () => {
        const { view } = container.make(Config);

        container.value(View, new Environment(new DotNotationLoader(view)));
    },

    boot: () => {
        const view = container.make<Environment>(View);

        interactsWithKernel(view);
        interactsWithRouter(view);
        interactsWithI18N(view);
        interactsWithAuthenticator(view);
    }
};

export const renderable = (template: string, asVariable: string = 'model') => <T extends {new(...args:any[]):{}}>(Target: T) => {

    return class extends Target {

        render(): Promise<string> {
            const view = container.make<Environment>(View);

            return new Promise<string>((resolve, reject) => {
                view.render(template, {[asVariable]: this}, (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(result);
                });
            });
        }
    }
};
