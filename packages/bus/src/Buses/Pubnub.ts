import Bus from "../Bus";

export default class Pubnub implements Bus {
    constructor(private sdk: any, private channel: string) { }

    listen(callback: Function): void {
        this.sdk.addListener({
            message: (message: any) => {
                callback(message);
            }
        })
    }

    async send(payload: any) {
        this.sdk.publish({
            message: payload,
            channel: this.channel,
            meta: {
                service: "fusion.bus"
            }
        });
    }
}
