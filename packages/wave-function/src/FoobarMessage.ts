export default class FoobarMessage {

    constructor(private message: string) { }

    toPayload() {
        return this.message;
    }

    channels() {
        return [
            'fusion.message'
        ];
    }

    static fromPayload(payload: any) {
        return new FoobarMessage(payload);
    }
}
