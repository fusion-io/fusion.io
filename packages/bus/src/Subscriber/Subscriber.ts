import { Manager, singleton } from "@fusion.io/core";
import SubscribeTransport, { MessageConsumer } from "./SubscribeTransport";

@singleton()
export default class Subscriber extends Manager<SubscribeTransport> {

    subscribe(channels: string|string[], handler: MessageConsumer, via?: string) {
        this.via(via).subscribe(channels, handler);
        return this;
    }

    via(via?: string) {
        return this.adapter(via);
    }
}
