import {Monad} from "@fusion.io/core";
import WorkerError from "../WorkerError";

export default class Retry implements Monad {

    private tries: number = 1;

    constructor(private execution: Function) { }

    setTryNumber(tries: number) {
        this.tries = tries;
    }

    async execute(...args: any[]) {

        let tryTime = 0;

        while (tryTime < this.tries) {
            try {
                return await this.execution();
            } catch (error) {
                tryTime++;
            }
        }

        throw new WorkerError(`Maximum try time reached. Failed to try to run the job in [${tryTime}] time(s)`);
    }
}
