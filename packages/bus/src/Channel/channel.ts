import ChannelController, {ChannelControllerConstructor} from "./ChannelController";
import { Middleware } from "./ChannelControllerStack";

export default (channels: string|string[], ...middlewares: Middleware[]) => (instance: ChannelController, action: string) => {
    (instance.constructor as ChannelControllerConstructor).subscriptions.push({
        channels,
        middlewares,
        action
    })
}
