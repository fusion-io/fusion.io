import chalk from "chalk";
import {VERBOSITY_DEBUG, VERBOSITY_ERROR, VERBOSITY_INFO} from "../Output";

export default class MessageBox {

    async showing(verbosity: number, message: string) {
        switch (verbosity) {
            case VERBOSITY_ERROR:
                return console.log(chalk`{black.bgRed ${message}}`);
            case VERBOSITY_INFO:
                return console.log(chalk`{black.bgCyan ${message}}`);
            case VERBOSITY_DEBUG:
                return console.log(chalk`{black.bgMagenta ${message}}`);
            default:
                return console.log(chalk`{black.bgGreen ${message} }`);
        }
    }
}
