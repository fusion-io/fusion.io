import HalEngine from "./HalEngine";
import {singleton} from "@fusion.io/container";

@singleton(HalEngine)
export default class RenderHalView {

    constructor(engine) {
        this.engine = engine;
    }

    async handle(context, next) {
        await next();
        if (context.fusionView) {
            context.body = await this.engine.render(context.fusionView);
            context.set('content-type', 'application/hal+json')
        }
    }
}
