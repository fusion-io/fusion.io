import {Logger} from "../Contracts";
import {singleton} from "@fusion.io/container";

@singleton(Logger)
export default class AccessLogger {

    constructor(logger) {
        this.logger = logger;
    }

    async handle(context, next) {
        await next();
        const status = context.response.status || 200;
        const message = `${status} - ${context.request.method.toUpperCase()} ${context.request.url}`;

        if (status < 300) {
            return this.logger.info(message);
        }

        if (status < 400) {
            return this.logger.verbose(message);
        }

        if (status < 500) {
            return this.logger.warn(message)
        }

        if (status < 600) {
            return this.logger.error(message)
        }

    }
}
