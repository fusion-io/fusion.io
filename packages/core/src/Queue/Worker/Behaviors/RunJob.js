export default class RunJob {
    constructor(logger) {
        this.logger = logger;
    }

    compile(fn) {
        return async (jobName, payload) => {
            this.logger.info(`Executing job [${jobName}] with payload [${payload}]`);
            await fn(jobName, payload);
            this.logger.info(`Finished execution job [${jobName}] with payload [${payload}]`);
        };
    }
}
