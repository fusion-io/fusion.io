import Plasma from "./Plasma";
import {tokamak} from "@fusion.io/core";

export {
    Plasma
}

export const renderable = (template: string, asVariable: string = 'model') => <T extends {new(...args:any[]):{}}>(Target: T) => {

    return class extends Target {

        render(): Promise<string> {
            const view = tokamak.make<any>("services.nunjucks");

            return new Promise<string>((resolve, reject) => {
                view.render(template, {[asVariable]: this}, (error: Error, result: any) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(result);
                });
            });
        }
    }
};
