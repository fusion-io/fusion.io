import {OutputHelper} from "../Output";
import ora from "ora";

export default class Spinner implements OutputHelper {

    async showing(verbosity: number, controlPromise?: Promise<string>|any, title: string = '') {
        const spinner = ora(title);

        spinner.start();

        if (controlPromise) {
            return Promise.resolve(controlPromise)
                .then(message => spinner.succeed(message))
                .catch(error => spinner.fail(error))
            ;
        }

        return spinner;
    }
}
