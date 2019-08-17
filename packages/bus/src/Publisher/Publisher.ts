import { Manager, singleton } from "@fusion.io/core";
import PublishTransport from "./PublishTransport";
import Message from "../Message";

@singleton()
export default class Publisher extends Manager<PublishTransport> {
    publish(message: Message, via?: string) {
        this.via(via).publish(message);
        return this;
    }

    via(via?: string) {
        return this.adapter(via);
    }
}
