import QueueRegistry from "./QueueRegistry";
import {container} from "@fusion.io/container";
import {Logger} from "../Contracts";

export default class SyncQueueDriver {
    constructor(registry, logger) {
        this.registry = registry;
        this.logger   = logger;
    }
    async dispatch({jobName, payload}) {

        const workload = this.registry.get(jobName);

        try {
            this.logger.info(`Executing job [${jobName}] with payload [${JSON.stringify(payload)}]`);

            await workload(payload);

            this.logger.info(`Job [${jobName}] executed successfully with payload [${JSON.stringify(payload)}]`);
        } catch (e) {

            this.logger.warn(`Failed to execute job [${jobName}] with payload [${payload}]. Reason: ${e.stack}`);
        }
    }

    pull() {
        throw new Error(`E_QUEUE: Using [${this.constructor.name}] does not required to execute the worker.`);
    }

    static install() {
        container.make(QueueRegistry, Logger);

        return new SyncQueueDriver(container.make(QueueRegistry), container.make(Logger));
    }
}
