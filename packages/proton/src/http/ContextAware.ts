import { Context } from "koa";

export interface ContextAware {
    setContext(context: Context): void;
}
