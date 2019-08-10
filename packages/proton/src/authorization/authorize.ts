import { tokamak } from "@fusion.io/core";
import { Authorizer } from "@fusion.io/authorization";
import { Context } from "koa";

export const authorize = (action: string, byPolicy?: string) => {

    const authorizer = tokamak.make<Authorizer>(Authorizer);

    return async(context: Context, next: Function) => {
        await authorizer.verify(context.identity, action, byPolicy);
        await next();
    }
};
