import { Manager, singleton, tokamak } from "@fusion.io/core";
import ChannelController, { ChannelControllerConstructor } from "./ChannelController";
import SubscribeTransport from "./SubscribeTransport";
import ChannelControllerStack, { Middleware } from "./ChannelControllerStack";

@singleton()
export default class Subscriber extends Manager<SubscribeTransport> {

    subscribe(channels: string|string[], via?: string, ...handler: Middleware[]) {
        const stack = new ChannelControllerStack(handler);

        this.adapter(via)
            .subscribe(channels, (message: any) => stack.dispatch(message))
        ;

        return stack;
    }

    controller(Constructor: ChannelControllerConstructor) {
        const instance = tokamak.make<ChannelController>(Constructor);

        instance.subscriptions().forEach(subscription => {
            this.subscribe(subscription.channels, subscription.via)
                .use(...subscription.middlewares)
        });
    }
}
