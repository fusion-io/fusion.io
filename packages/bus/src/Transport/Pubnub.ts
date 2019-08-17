import PublishTransport from "../Publisher/PublishTransport";
import SubscribeTransport from "../Subscriber/SubscribeTransport";
import Message from "../Message";
import PubnubCore from "pubnub";

export default class Pubnub implements PublishTransport, SubscribeTransport {

    constructor(private client: PubnubCore) { }

    publish(message: Message) {
        return this.client.publish({
            channel: message.channel(),
            message: {
                as      : message.as ? message.as() : message.constructor.name,
                payload : message.payload ? message.payload(): message
            }
        });
    }

    subscribe(channels: string | string[], consumer: (message: any) => Promise<void>) {
        this.client.addListener({
            message(incoming) {
                return consumer(incoming.message)
            }
        });
        this.client.subscribe({
            channels: typeof channels === 'string' ? [ channels ] : channels
        });
    }
}
