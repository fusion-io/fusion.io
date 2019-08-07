import { OutputHelper } from "../Output";
import Table3 from "cli-table3";

export default class Table implements OutputHelper {
    async showing(verbosity: number, options :any, renderFunctionOrData: Function|any[]) {
        const table = new Table3(options);

        if ('function' === typeof renderFunctionOrData) {
            await renderFunctionOrData(table);
        } else {
            table.push(...renderFunctionOrData);
        }

        console.log(table);
    }
}
