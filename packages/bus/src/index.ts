import {container, ManagerConfiguration} from "@fusion.io/core";
import Bus from "./Bus";
import Hub from "./Hub";
import {Message, MessageConstructor} from "./Message";
import LocalEvent from "./Buses/LocalEvent";
import MQTT from "./Buses/MQTT";
import Pubnub from "./Buses/Pubnub";
import SocketIO from "./Buses/SocketIO";
import Delegated from "./Buses/Delegated";

export {

    // Core
    Hub, Bus, Message, MessageConstructor,

    // Bus drivers
    LocalEvent, MQTT, Pubnub, SocketIO, Delegated
}

const checkForServices = (service: string) => {
    if (!container.bound(service)) {
        throw new Error(`The required service package [${service}] is not configured`)
    }

    return container.make(service);
};

export const plasma = {
    compose() {
        const hubManager = container.make<Hub>(Hub);

        hubManager
            .supporting('local', () => new LocalEvent())
            .supporting('mqtt', ({ topic, serviceLocation = 'services.mqtt' }) => {
                const client = checkForServices(serviceLocation);
                return new MQTT(client, topic);
            })
            .supporting('pubnub', ({channel, serviceLocation = 'services.pubnub'}) => {
                const client:any = checkForServices(serviceLocation);
                client.subscribe({ channels: [channel] });
                return new Pubnub(client, channel)
            })
            .supporting('socket.io', ({serviceLocation = 'services.socket.io'}) => {
                const socket = checkForServices(serviceLocation);
                return new SocketIO(socket);
            })
            .supporting('delegated', ({sender, listener}) => new Delegated(sender, listener))
        ;
    },

    boot() {
        const hubManager = container.make<Hub>(Hub);
        const { hub }: { hub: ManagerConfiguration } = container.make('config');

        hubManager.configure(hub);
    }
};
