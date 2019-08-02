import { Context } from "koa";

export default async (context: Context, next: Function) => {

    try {
        await next();
    } catch (error) {

        const Youch     = require('youch');
        const youch     = new Youch(error, context.request);

        context.status = 500;

        switch (context.accepts('json', 'html')) {

            case "json":
                return context.body = await youch.toJSON();
            case "html":
                return context.body = await youch.toHTML();
            default:
                return context.body = error.toString()
        }

    }
}
