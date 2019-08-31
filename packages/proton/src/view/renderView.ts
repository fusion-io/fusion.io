import { tokamak } from "@fusion.io/core";
import { Environment } from "@fusion.io/integrations-handlebars";

export default async (context: any, next: Function) => {
    context.render = (view: string, model: any) => {
        context.vm = { view, model };
        return context;
    };

    await next();

    if (context.vm) {
        context.body = await tokamak
            .make<Environment>(Environment)
            .render(context.vm.view, { ...context, ...context.vm.model })
        ;
    }
}
