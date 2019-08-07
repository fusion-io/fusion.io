import { OutputHelper, VERBOSITY_DEBUG, VERBOSITY_ERROR, VERBOSITY_INFO } from "../Output";
import chalk from "chalk";

export default class Log implements OutputHelper {

    async showing(verbosity: number, message: any) {
        switch (verbosity) {
            case VERBOSITY_ERROR:
                return console.log(chalk`{red ${message}}`);
            case VERBOSITY_INFO:
                return console.log(chalk`{cyan ${message}}`);
            case VERBOSITY_DEBUG:
                return console.log(chalk`{magenta ${message}}`);
            default:
                return console.log(message);
        }
    };
}
