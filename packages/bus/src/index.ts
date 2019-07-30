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
            .supporting('mqtt', ({ topic }) => {
                const client = checkForServices('services.mqtt');
                return new MQTT(client, topic)
            })
            .supporting('pubnub', ({channel}) => {
                const client = checkForServices('services.pubnub');
                return new Pubnub(client, channel)
            })
            .supporting('socket.io', () => {
                const socket = checkForServices('services.socket.io');
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
