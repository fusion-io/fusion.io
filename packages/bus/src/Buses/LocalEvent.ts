import Bus from "../Bus";
import {EventEmitter} from "events";

/**
 * Local event bus
 */
export default class LocalEvent implements Bus {

    /**
     *
     * @param event
     */
    constructor(private event: EventEmitter = new EventEmitter()) { }

    /**
     *
     * @param callback
     */
    listen(callback: Function) {
        this.event.on('fusion.message', payload => callback(payload));
    }

    /**
     *
     * @param payload
     */
    async send(payload: any) {
        this.event.emit('fusion.message', payload);
    }
}
