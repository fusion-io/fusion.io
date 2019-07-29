import Bus from "../Bus";

export default class MQTT implements Bus {

    constructor(private client: any, private topic: string) { }

    listen(callback: Function): void {
        this.client.on('message', (topic: string, payload: any) => {
            callback(payload);
        })
    }

    async send(payload: any) {
        // TODO will handle acks
        this.client.publish(this.topic, payload);
    }
}
