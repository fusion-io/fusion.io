import Bus from "../Bus";

/**
 * Just wrap 2 methods send/listen methods into one Bus unit
 */
export default class Delegated implements Bus {

    /**
     *
     * @param sender
     * @param listener
     */
    constructor(private sender: Function, private listener: Function) { }

    /**
     *
     * @param callback
     */
    listen(callback: Function): void {
        this.listener(callback);
    }

    /**
     *
     * @param payload
     */
    send(payload: any): Promise<void> {
        return this.sender(payload)
    }
}
