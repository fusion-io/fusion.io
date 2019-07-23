export default class Delay {
    constructor(milisec) {
        this.milisec = milisec;
    }

    compile(fn) {
        return async(jobName, payload) => {
            await new Promise(resolve => setTimeout(resolve, this.milisec));
            await fn(jobName, payload);
        }
    }
}
