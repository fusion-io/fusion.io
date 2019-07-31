import Bus from "../Bus";

/**
 * Using Pubnub as the bus transport
 */
export default class Pubnub implements Bus {

    /**
     *
     * @param sdk
     */
    constructor(private sdk: any) { }

    /**
     *
     * @param callback
     * @param on
     */
    listen(callback: Function, on: string): void {
        this.sdk.addListener({
            message: (incoming: any) => {
                if (incoming.channel === on) {
                    callback(incoming.message);
                }
            }
        });
        this.sdk.subscribe({channels: [on]});
    }

    /**
     *
     * @param payload
     * @param via
     */
    async send(payload: any, via: string[]) {

        const publishPromises = via.map(channel => this.sdk.publish({
            message: payload,
            channel: channel,
            meta: {
                service: "fusion.bus"
            }
        }));

        await Promise.all(publishPromises);
    }
}
