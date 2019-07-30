import {Monad} from "@fusion.io/core";
import {EventEmitter} from "events";
import QueueHub from "./QueueHub";
import {Message} from "@fusion.io/bus";

export type Job = Message & {
    run(...args: any[]): Promise<void>
}

export default class QueueWorker {

    constructor(private executor: Monad, private event: EventEmitter = new EventEmitter()) { }

    workOn(queue: QueueHub, bus?: string) {
        queue.onMessage((job: Job|any) => {
            return this.execute(job)
                .then(() => this.event.emit('job.finished', job))
                .catch(error => this.event.emit('job.failed', error, job))
            ;
        }, bus);
    }

    execute(job: Job) {
        return this.executor.execute(() => job.run());
    }
}
