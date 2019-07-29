import Bus from "../Bus";

export default class SocketIO implements Bus {

    constructor(private socket: any) { }

    listen(callback: Function): void {
        this.socket.on('fusion.message', (payload: any) => {
            callback(payload);
        })
    }

    async send(payload: any) {
        this.socket.emit('fusion.message', payload);
    }
}
