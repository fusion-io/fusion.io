import {Context} from "koa";
import {container} from "@fusion.io/core";
import {Config, Logger as ILogger} from "./serviceLocator";
import {Logger} from "winston";

const Youch = require('youch');

export default async (context: Context, next: Function) => {

    try {
        await next();
    } catch (error) {

        const logger    = container.make<Logger>(ILogger);
        const { debug } = container.make(Config);

        logger.error(error);

        if (!debug) {
            throw error;
        }

        const youch = new Youch(error, context.request);

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