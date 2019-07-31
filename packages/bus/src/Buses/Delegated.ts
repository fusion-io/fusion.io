import Bus from "../Bus";

/**
 * Just wrap 2 methods send/listen methods into one Bus unit
 */
export default class Delegated implements Bus {

    constructor(private listener: Function, private sender: Function) { }

    listen(callback: Function, on: string): void {
        this.listener(callback, on);
    }

    send(payload: any, via: string[]): Promise<void> {
        return this.sender(payload, via);
    }
}
