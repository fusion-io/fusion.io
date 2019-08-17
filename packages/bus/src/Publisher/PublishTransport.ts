import Message from "../Message";

export default interface PublishTransport {
    publish(message: Message): void
}
