import { Policy } from "@fusion.io/authorization";
import { ContextAware } from "../http";
import { Context } from "koa";

export abstract class ContextAwarePolicy<Identity> implements Policy<Identity>, ContextAware {

    protected context: {} = { };

    abstract check(identity: Identity, permission: string): Promise<boolean>;

    abstract granted(identity: Identity): Promise<string[]>;

    setContext(context: Context): void {
        this.context = context;
    }

    getContext(): Context {
        return this.context as Context
    }
}
