import { Authenticator } from "@fusion.io/authenticate";
import { tokamak } from "@fusion.io/core";
import { Context } from "koa";

export const authenticate = (gateway: string) => {

    const authenticator = tokamak.make<Authenticator>(Authenticator);

    return async (context: Context, next: Function) => {
        await authenticator.guard(gateway)(context, next)
    }
};
