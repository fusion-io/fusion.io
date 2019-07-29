import Bus from "../Bus";

/**
 * Using Pubnub as the bus transport
 */
export default class Pubnub implements Bus {

    /**
     *
     * @param sdk
     * @param channel
     */
    constructor(private sdk: any, private channel: string) { }

    /**
     *
     * @param callback
     */
    listen(callback: Function): void {
        this.sdk.addListener({
            message: (message: any) => {
                callback(message);
            }
        })
    }

    /**
     *
     * @param payload
     */
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
