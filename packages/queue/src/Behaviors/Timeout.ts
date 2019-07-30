import {Monad} from "@fusion.io/core";
import WorkerError from "../WorkerError";

export default class Timeout implements Monad {

    private timeout: number = -1;

    constructor(private execution: Function) { }

    setTimeout(timeout: number) {
        this.timeout = timeout;
    }

    execute(...args: any[]) {

        const timeoutClock = new Promise(((resolve, reject) => {
            setTimeout(() => {
                reject(new WorkerError(`Job execution time out exceeded [${this.timeout}]ms`));
            }, this.timeout);
        }));

        return Promise.race([
            timeoutClock,
            Function()
        ])
    }
}
