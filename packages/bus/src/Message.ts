/**
 * Shape of the message class
 */
export type MessageConstructor = {
    new(...args: any[]): Message,
    fromPayload(payload: any): Message,
    name: string
}

/**
 * The message instance
 */
export type Message = {
    toPayload(): any,
    channels():string[]
}
