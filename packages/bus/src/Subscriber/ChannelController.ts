import { Middleware } from "./ChannelControllerStack";

export type SubscriptionsMetadata = {
    via?: string
    channels: string|string[]
    middlewares: Middleware[]
}

export type ChannelControllerConstructor = {
    new(args: any[]): ChannelController
}

export default class ChannelController {
    subscriptions(): SubscriptionsMetadata[] {
        return [];
    }
}
