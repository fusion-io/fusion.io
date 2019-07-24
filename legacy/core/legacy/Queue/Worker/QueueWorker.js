export default class QueueWorker {
    constructor(registry, behaviors) {
        this.registry  = registry;
        this.behaviors = behaviors;
    }

    async work({jobName, payload}) {
        const workload = this.registry.get(jobName);

        const compiledWorkload = this.behaviors.compile((jobName, payload) => workload(payload));

        await compiledWorkload(jobName, payload);
    };
}
