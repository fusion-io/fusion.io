import Bus from "../Bus";

/**
 * Using MQTT as the bus transport
 */
export default class MQTT implements Bus {

    /**
     *
     * @param client
     */
    constructor(private client: any) { }

    /**
     *
     * @param callback
     * @param on
     */
    listen(callback: Function, on: string): void {
        this.client.on((topic: string, payload: any) => {
            if (topic === on) {
                callback(payload, JSON.parse(payload));
            }
        })
    }

    /**
     *
     * @param payload
     * @param via
     */
    async send(payload: any, via: string[]) {
        via.forEach(channel => {
            this.client.publish(channel, JSON.stringify(payload));
        });
    }
}
