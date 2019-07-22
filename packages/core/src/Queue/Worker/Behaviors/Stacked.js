export default class Stacked {
    constructor(stack) {
        this.stack = stack;
    }

    compile(fn) {
        return this.stack.reduceRight((compiled, behavior) =>
            behavior.compile(compiled), (jobName, payload) => fn(jobName, payload)
        );
    }
}
