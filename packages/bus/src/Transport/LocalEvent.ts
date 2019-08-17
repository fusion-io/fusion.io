import PublishTransport from "../Publisher/PublishTransport";
import SubscribeTransport from "../Subscriber/SubscribeTransport";
import Message from "../Message";
import { EventEmitter } from "events";

export default class LocalEvent implements PublishTransport, SubscribeTransport {
    constructor(private emitter: EventEmitter = new EventEmitter()) { }

    publish(message: Message) {
        let channels = message.channel();

        channels = ('string' === typeof channels) ? [ channels ] : channels;
        channels.forEach(channel => this.emitter.emit(channel, message.payload ? message.payload() : message));
    }

    subscribe(channels: string | string[], consumer: (message: any) => Promise<void>) {
        channels = ('string' === typeof channels) ? [ channels ] : channels;
        channels.forEach(channel => {
            this.emitter.on(channel, consumer);
        });
    }
}
