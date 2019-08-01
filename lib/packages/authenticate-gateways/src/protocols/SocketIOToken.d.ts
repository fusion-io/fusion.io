import { ContextConsumer, Mountable, Protocol } from "@fusion.io/authenticate";
import { SocketContext } from "./Contracts";
/**
 * @implements Protocol
 * @implements Mountable
 */
export default class SocketIOToken implements Protocol, Mountable {
    mount(consumer: ContextConsumer): (socket: any, next: Function) => void;
    resolve({ socket: { handshake } }: {
        socket: SocketContext;
    }): Promise<{
        token: any;
    }>;
}
