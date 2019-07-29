import Bus from "../Bus";

/**
 * Using MQTT as the bus transport
 */
export default class MQTT implements Bus {

    /**
     *
     * @param client
     * @param topic
     */
    constructor(private client: any, private topic: string) { }

    /**
     *
     * @param callback
     */
    listen(callback: Function): void {
        this.client.on('message', (topic: string, payload: any) => {
            callback(payload);
        })
    }

    /**
     *
     * @param payload
     */
    async send(payload: any) {
        this.client.publish(this.topic, payload);
    }
}
