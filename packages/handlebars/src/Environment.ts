import { MiddlewareDispatcher, singleton } from "@fusion.io/core";
import Handlebars from "handlebars";
import fs from "fs";
import glob from "glob";
import path from "path";

export type RenderingMiddleware = (context: any, next: Function) => Promise<any>|any;

@singleton()
export default class Environment {

    protected renderDispatchers: Map<string, MiddlewareDispatcher> = new Map();

    loadViews(directory: string) {
        glob.sync(directory + '/**/*.hbs').forEach(template => {
            const partial = path
                .relative(directory, template)
                .replace(/^\//, '')
                .replace('.hbs', '')
            ;

            Handlebars.registerPartial(partial, fs.readFileSync(template).toString());
        });

        return this;
    }

    rendering(view: string, middleware: RenderingMiddleware) {
        if (!this.renderDispatchers.has(view)) {
            this.renderDispatchers.set(view, new MiddlewareDispatcher());
        }

        (this.renderDispatchers.get(view) as MiddlewareDispatcher).use(middleware);

        return this;
    }

    async render(view: string, context: {} = {}) {
        const dispatcher = this.renderDispatchers.get(view);

        if (dispatcher) {
            await dispatcher.dispatch(context);
        }

        return Handlebars.compile(`{{> ${view} }}`)(context);
    }
}
