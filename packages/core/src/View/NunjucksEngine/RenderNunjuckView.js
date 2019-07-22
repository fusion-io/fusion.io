import ViewEngineNunjucks from "./ViewEngineNunjucks";
import {singleton} from "@fusion.io/container";

@singleton(ViewEngineNunjucks)
export default class RenderNunjuckView {

    constructor(engine) {
        this.engine = engine;
    }

    async handle(context, next) {
        await next();
        if (context.fusionView) {
            context.type = 'html';
            context.body = await this.engine.render(context.fusionView);
        }
    }
}
