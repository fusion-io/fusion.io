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
     * @param on
     */
    listen(callback: Function, on: string) {
        this.event.on(`fusion.${on}`, payload => callback(payload));
    }

    /**
     *
     * @param payload
     * @param via
     */
    async send(payload: any, via: string[]) {

        via.forEach(channel => {
            this.event.emit(`fusion.${channel}`, payload);
        });
    }
}
