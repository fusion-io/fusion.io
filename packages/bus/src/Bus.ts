export default interface Bus {

    /**
     * Sending a payload through out this bus
     *
     * @param payload
     * @param via
     */
    send(payload: any, via: string[]): Promise<void>

    /**
     * Listening for the incoming message.
     *
     * @param callback
     * @param on
     */
    listen(callback: Function, on: string): void
}
