import { ContextConsumer, Mountable, Protocol } from "../Contracts";
import { SocketContext } from "./Contracts";
import UnAuthenticated from "../UnAuthenticated";

/**
 * @implements Protocol
 * @implements Mountable
 */
export default class SocketIOToken implements Protocol, Mountable {

    public mount(consumer: ContextConsumer) {
        return (socket: any, next: Function) => {
            consumer({socket}).then(identity => {
                socket.identity = identity;
                next();
            }).catch(error => {
                if (error instanceof UnAuthenticated) {
                    next(error);
                } else {
                    throw error;
                }
            })
        };
    }

    public async resolve({socket: {handshake}}: {socket: SocketContext}) {
        if (!handshake.query.token) {

            throw new UnAuthenticated("No token provided");
        }

        return { token: handshake.query.token };
    }
}
