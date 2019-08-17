import { Middleware } from "./ChannelControllerStack";

export type SubscriptionsMetadata = {
    channels: string|string[]
    middlewares: Middleware[]
    action: string
}

export type ChannelControllerConstructor = {
    new(args: any[]): ChannelController
    subscriptions: SubscriptionsMetadata[]
    middlewares: Middleware[]
}

export default class ChannelController {
    public static channels      = [];
    public static middlewares   = [];
    public static subscriptions = [];
}
