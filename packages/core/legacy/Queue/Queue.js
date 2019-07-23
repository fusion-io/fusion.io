import Manager from "../utils/Manager";
import SyncQueueDriver from "./SyncQueueDriver";
import lodash from "lodash";
import DatabaseQueueDriver from "./DatabaseQueueDriver";

export default class Queue extends Manager {

    constructor(registry, {defaultConnection, queues}) {
        super();
        this.registry           = registry;
        this.defaultConnection  = defaultConnection;
        this.connnectionConfig  = queues;

        this.drivers  = {
            "sync": SyncQueueDriver,
            "database": DatabaseQueueDriver
        }
    }

    getDefaultAdapterName() {
        return this.defaultConnection;
    }

    resolveDriver(connection) {
        return this.configOf(connection)['driver'];
    }

    configOf(connection) {
        const adapterConfig = this.connnectionConfig[connection];

        if (!adapterConfig) {
            throw new Error(`E_QUEUE: Queue connection [${connection}] is not configured.`);
        }

        return adapterConfig;
    }

    queue(queueName = null) {
        return this.adapter(queueName);
    }

    enqueue(job, payload = null, queue = null) {

        let jobName = job;

        // This one is a job class
        if(lodash.isFunction(job.execute) && lodash.isFunction(job.toPayload)) {
            jobName = job.constructor.name;
            payload = job.toPayload();
        }

        if (!this.registry.has(jobName)) {
            throw new Error(`E_QUEUE: Could not enqueue job named [${jobName}]. ` +
                `The job's workload is not registered to the registry.`
            );
        }

        return this.queue(queue).dispatch({jobName, payload});
    }
}
