import { inject, Plasma as CorePlasma } from "@fusion.io/proton";
import { Subscriber, MessageManager } from "@fusion.io/bus";
import HelloWorldController from "./HelloWorldController";
import HelloMessage from "./HelloMessage";

export default class PubSubPlasma extends CorePlasma {

    @inject(MessageManager)
    compose(manager: MessageManager) {
        manager.register(HelloMessage, {

            async serialize(message: HelloMessage) {
                return JSON.stringify(message.payload())
            },

            async deserialize(raw: string) {
                const { content } = JSON.parse(raw);
                return new HelloMessage(content)
            }
        })
    }

    @inject(Subscriber)
    boot(sub: Subscriber) {
        sub.controller(HelloWorldController);
    }
}
