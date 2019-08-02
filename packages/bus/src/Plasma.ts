import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import Hub from "./Hub";
import LocalEvent from "./Buses/LocalEvent";
import MQTT from "./Buses/MQTT";
import Pubnub from "./Buses/Pubnub";
import SocketIO from "./Buses/SocketIO";
import Delegated from "./Buses/Delegated";

export default class Plasma extends CorePlasma {


    checkForServices(service: string) {
        if (!this.tokamak.bound(service)) {
            throw new Error(`The required service package [${service}] is not configured`)
        }

        return this.tokamak.make(service);
    };


    @inject(Hub)
    compose(hubManager: Hub) {
        hubManager
            .supporting('local', () => new LocalEvent())

            .supporting('mqtt', ({ serviceLocation } = { serviceLocation: 'services.mqtt' }) => {
                const client = this.checkForServices(serviceLocation);
                return new MQTT(client);
            })

            .supporting('pubnub', ({ serviceLocation } = { serviceLocation: 'services.pubnub' }) => {
                const client:any = this.checkForServices(serviceLocation);
                return new Pubnub(client)
            })

            .supporting('socket.io', ({ serviceLocation } = { serviceLocation: 'services.socket.io'}) => {
                const socket = this.checkForServices(serviceLocation);
                return new SocketIO(socket);
            })

            .supporting('delegated', ({ sender, listener }: {sender: Function, listener: Function}) =>
                new Delegated(sender, listener)
            )
        ;
    }

    @inject(Hub)
    boot(hubManager: Hub) {
        const { hub } = this.config;

        hubManager.configure(hub);
    }
}
