export default class LogError {

    constructor(logger) {
        this.logger = logger;
    }

    compile(fn) {
        return async (jobName, payload) => {
            try {
                await fn(jobName, payload);
            } catch (e) {
                this.logger.error(`Failed to execute job [${jobName}] with payload [${payload}]`);
                throw e;
            }
        }
    }
}
