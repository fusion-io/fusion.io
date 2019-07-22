import {container} from "@fusion.io/container";
import {View} from "../Contracts";
import ViewEngineNunjucks from "./NunjucksEngine/ViewEngineNunjucks";

export const renderable = (view, extraData = {}) => {
    return Target => {
        return class extends Target {
            async render(firstStepOnly = false) {

                const viewFactory   = container.make(View);
                const firstStepView = await viewFactory.render(view, {...extraData, self: this});


                if (firstStepOnly) {
                    return firstStepView;
                }

                const engine = container.make(ViewEngineNunjucks);

                return engine.render(firstStepView);
            }
        }
    }
};


export const hal = selfLink => Target => {
    return class extends Target {

        static generateSelfLink(data) {
            return {
                href: selfLink(data)
            };
        }
    }
};
