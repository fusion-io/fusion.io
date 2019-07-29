/**
 * Shape of the message class
 */
export type MessageConstructor = {
    new(...args: any[]): Message,
    fromPayload(payload: any): Message
}

/**
 * The message instance
 */
export type Message = {
    toPayload(): any
}
