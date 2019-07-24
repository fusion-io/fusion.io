import winston from "winston";
import ServiceProvider from "../utils/ServiceProvider";
import {Config, Logger} from "../Contracts";

export default class LoggerServiceProvider extends ServiceProvider {

    register() {
        this.container.singleton(Logger, (container) => {
            const config = container.make(Config);

            return winston.createLogger(config.get('logger'))
        });
    }
}
