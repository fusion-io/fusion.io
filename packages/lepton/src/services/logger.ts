import winston from "winston";
import {container} from "@fusion.io/core";
import { Logger } from "../serviceLocator";

export const plasma = {

    compose: () => {

        const { logger } = container.make('config');

        container.value(Logger, winston.createLogger(logger));
    }
};
