import { tokamak } from "@fusion.io/core";
import Environment from "./Environment";

export default async (context: any, next: Function) => {
    context.render = (view: string, data: any) => {
        context.vm = tokamak.make<Environment>(Environment).render(view, data);
        return context;
    };

    await next();

    if (context.vm) {
        context.body = await context.vm;
    }
}
