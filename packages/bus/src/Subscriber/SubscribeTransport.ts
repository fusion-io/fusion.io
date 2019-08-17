export type MessageConsumer = (message: any) => Promise<void>

export default interface SubscribeTransport {
    subscribe(channels: string | string[], consumer: MessageConsumer): void
}
