import lodash from "lodash";

export default class QueueRegistry extends Map {

    register(Job, ...jobParameters) {
        if (!lodash.isFunction(Job.fromPayload)) {
            throw new Error(`E_QUEUE_REGISTRY: Could not register job class ${Job}. It must implement static method fromPayload().`)
        }

        this.set(Job.name, (payload) => {
            let job = Job.fromPayload(payload);

            if (!lodash.isFunction(job.execute)) {
                throw new Error(`E_QUEUE_REGISTRY: Could not execute job ${Job}. It must implement method execute().`);
            }

            return job.execute(...jobParameters)
        });
    }
}
