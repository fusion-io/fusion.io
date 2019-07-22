export default class Timeout {
    constructor(milisec) {
        this.milisec = milisec;
    }

    compile(fn) {
        return (jobName, payload) => Promise.race(
            [
                new Promise((resolve, reject) => setTimeout(() => reject(new Error(`E_WORKER_BEHAVIOR_TIMEOUT: Job execution exceed [${this.milisec}ms] timeout`)), this.milisec)),
                fn(jobName, payload)
            ]
        );
    }
}
