import PublishTransport from "../Publisher/PublishTransport";
import SubscribeTransport from "../Subscriber/SubscribeTransport";
import Message from "../Message";
import { EventEmitter } from "events";

export default class LocalEvent implements PublishTransport, SubscribeTransport {

    constructor(private emitter: EventEmitter = new EventEmitter()) { }

    publish(message: Message) {
        this.emitter.emit(message.channel(), {
            as      : message.as ? message.as() : message.constructor.name,
            payload : message.payload ? message.payload() : message
        })
    }

    subscribe(channels: string | string[], consumer: (message: any) => Promise<void>) {
        channels = ('string' === typeof channels) ? [ channels ] : channels;
        channels.forEach(channel => {
            this.emitter.on(channel, consumer);
        });
    }
}
