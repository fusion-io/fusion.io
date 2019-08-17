import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import Publisher from "./Publisher/Publisher";
import Subscriber from "./Subscriber/Subscriber";
import LocalEvent from "./Transport/LocalEvent";
import Pubnub from "./Transport/Pubnub";

export default class Plasma extends CorePlasma {

    @inject(Publisher, Subscriber)
    compose(pub: Publisher, sub: Subscriber) {
        const transport = new LocalEvent();

        pub.supporting('local', () => transport);
        sub.supporting('local', () => transport);

        const pubnubDriver = (options: any) => {
            const Client = require('pubnub');
            return new Pubnub(new Client(options))
        };
        pub.supporting('pubnub', pubnubDriver);
        sub.supporting('pubnub', pubnubDriver);
    }

    @inject(Publisher, Subscriber)
    boot(pub: Publisher, sub: Subscriber) {
        const { publisher, subscriber } = this.config;

        pub.configure(publisher);
        sub.configure(subscriber);
    }
}
