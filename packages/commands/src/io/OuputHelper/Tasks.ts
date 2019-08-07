import { OutputHelper } from "../Output";
import List from "listr";

export default class Tasks implements OutputHelper {
    async showing(verbosity: number, tasks: any[], options?: any) {
        return new List(tasks, options).run();
    };
}
