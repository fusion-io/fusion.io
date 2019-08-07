import { OutputHelper } from "../Output";
import ProgressBarUI  from "progress";

export default class ProgressBar implements OutputHelper {
    async showing(verbosity: number, total: number, controller?: Function, format?: string) {
        const bar = new ProgressBarUI(format || 'Loading :bar :current/:total', {
            total,
            complete: '█',
            incomplete: '░'
        });

        if (controller) controller(bar);

        return bar;
    }
}
