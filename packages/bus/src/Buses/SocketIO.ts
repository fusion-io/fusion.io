import Bus from "../Bus";

/**
 * Using Socket.IO client as the bus transport
 */
export default class SocketIO implements Bus {

    /**
     *
     * @param socket
     */
    constructor(private socket: any) { }

    /**
     *
     * @param callback
     */
    listen(callback: Function): void {
        this.socket.on('fusion.message', (payload: any) => {
            callback(payload);
        })
    }

    /**
     *
     * @param payload
     */
    async send(payload: any) {
        this.socket.emit('fusion.message', payload);
    }
}
