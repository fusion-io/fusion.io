export default class Retry {
    constructor(tries, logger) {
        this.tries  = tries;
        this.logger = logger;
    }

    compile(fn) {
        return async(jobName, payload) => {
            let attempts = 0;
            let lastKnownError = null;

            while (attempts < this.tries) {
                try {
                    return await fn(jobName, payload);
                } catch (e) {
                    attempts++;
                    lastKnownError = e;
                    this.logger.error(
                        `Failed to execute job [${jobName}] with payload ${payload}. Reason: ${e.message}. ` +
                        `Retrying [${attempts}]...`
                    )
                }
            }

            let e = new Error(
                `E_WORKER_BEHAVIOR_RETRY: Failed to execute job [${jobName}] with payload [${payload}]. ` +
                `Attempted [${attempts}] time(s). Last known error reason ${lastKnownError.stack}`
            );

            this.logger.error(e.stack);

            throw e;
        }
    }
}
