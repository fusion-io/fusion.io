import {Config, Logger, Queue as QueueInterface} from "../Contracts";
import ServiceProvider from "../utils/ServiceProvider";
import QueueRegistry from "./QueueRegistry";
import Queue from "./Queue";
import QueueWorker from "./Worker/QueueWorker";
import Stacked from "./Worker/Behaviors/Stacked";
import Delay from "./Worker/Behaviors/Delay";
import RunJob from "./Worker/Behaviors/RunJob";
import Timeout from "./Worker/Behaviors/Timeout";
import LogError from "./Worker/Behaviors/LogError";
import Retry from "./Worker/Behaviors/Retry";

export default class QueueServiceProvider extends ServiceProvider {
    register() {

        this.container.value(QueueRegistry, new QueueRegistry());

        this.container.singleton(QueueInterface, (container) => {
            const config = container.make(Config);

            return new Queue(container.make(QueueRegistry), config.get('queue'));
        });

        this.registerWorker();
    }

    registerWorker() {
        this.container.singleton(QueueWorker, (container, retry, timeout, delay) => {

            return new QueueWorker(
                container.make(QueueRegistry),
                new Stacked([
                    new LogError(container.make(Logger)),
                    new Retry(retry, container.make(Logger)),
                    new Timeout(timeout),
                    new Delay(delay),
                    new RunJob(container.make(Logger))
                ])
            )
        })
    }
}
