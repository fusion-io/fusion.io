import { OutputHelper } from "../Output";

export default class UI implements OutputHelper {

    async showing(verbosity: number, renderFunction: Function) {
        const ui = require('cliui')();

        renderFunction(ui);

        console.log(ui.toString());
    };
}
