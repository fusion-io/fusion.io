import { tokamak } from "@fusion.io/core";
import { Authorizer, AuthorizationContext } from "@fusion.io/authorization";
import { Context } from "koa";

export const authorize = (action: string, byPolicy?: string) => {

    const authorizer = tokamak.make<Authorizer>(Authorizer);

    return async(context: Context|AuthorizationContext<any>, next: Function) => {
        await authorizer.verify(context as AuthorizationContext<any>, action, byPolicy);
        await next();
    }
};
