import { Context } from "koa";
import { singleton } from "@fusion.io/core";

export type HandleFunction = (error: Error, context: Context) => Promise<void>;

type ErrorConstructor = {
    new(message: string): Error
}

@singleton()
export default class ErrorHandler {

    private handlers: Map<ErrorConstructor, HandleFunction> = new Map<ErrorConstructor, HandleFunction>();

    willHandle(Error: ErrorConstructor, handler: HandleFunction) {
        this.handlers.set(Error, handler);
        return this;
    }

    middleware() {
        return async (context: Context, next: Function) => {
            try {
                await next();
            } catch (error) {
                await this.handle(error, context);
            }
        }
    }

    async handle(error: Error, context: Context) {
        let handleStack: HandleFunction[] = [];

        this.handlers.forEach((handler, ErrorConstructor) => {
            if (error instanceof ErrorConstructor) {
                handleStack.push(handler);
            }
        });

        if (!handleStack.length) {
            throw error;
        }

        await Promise.all(handleStack.map(handler => handler(error, context)));
    }
}
