export default interface Bus {

    /**
     * Sending a payload through out this bus
     *
     * @param payload
     */
    send(payload: any): Promise<void>

    /**
     * Listening for the incoming message.
     *
     * @param callback
     */
    listen(callback: Function): void
}
