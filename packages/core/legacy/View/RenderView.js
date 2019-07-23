import {View} from "../Contracts";
import {singleton} from "@fusion.io/container";

@singleton(View)
export default class RenderView {

    constructor(viewFactory) {
        this.viewFactory = viewFactory;
    }

    handle(context, next) {
        context.render = async (viewName, data = {}) => {
            context.fusionView = await this.viewFactory.render(viewName, data);
        };

        return next();
    }
}
