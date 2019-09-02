import { tokamak } from "@fusion.io/core";
import { Authorizer, Policy } from "@fusion.io/authorization";
import { Context } from "koa";
import { ContextAwarePolicy } from "./ContextAwarePolicy";

export const authorize = (action: string, byPolicy?: string) => {

    const authorizer = tokamak.make<Authorizer>(Authorizer);

    return async(context: Context, next: Function) => {
        authorizer.installed().forEach((policy: Policy<any>|ContextAwarePolicy<any>) => {
            if (policy instanceof ContextAwarePolicy) {
                policy.setContext(context);
            }
        });

        await authorizer.verify(context.identity, action, byPolicy);
        await next();
    }
};
