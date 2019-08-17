import { Manager, singleton, tokamak } from "@fusion.io/core";
import ChannelController, { ChannelControllerConstructor } from "../Channel/ChannelController";
import SubscribeTransport from "./SubscribeTransport";
import ChannelControllerStack, { Middleware } from "../Channel/ChannelControllerStack";

@singleton()
export default class Subscriber extends Manager<SubscribeTransport> {

    subscribe(channels: string|string[], via?: string, ...handler: Middleware[]) {
        const stack = new ChannelControllerStack(handler);

        this.adapter(via)
            .subscribe(channels, (message: any) => stack.dispatch(message))
        ;

        return stack;
    }

    controller(Constructor: ChannelControllerConstructor, via?: string) {
        const instance = tokamak.make<ChannelController>(Constructor);

        Constructor.subscriptions.forEach(subscription => {
            this.subscribe(subscription.channels, via)
                .use(...Constructor.middlewares)
                .use(...subscription.middlewares)
                // @ts-ignore
                .use(instance[subscription.action])
        });
    }
}
