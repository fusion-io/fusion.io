export default class FoobarMessage {
    constructor(private message: string) { }

    toPayload() {
        return this.message;
    }

    static fromPayload(payload: string) {
        return new FoobarMessage(payload)
    }
}
