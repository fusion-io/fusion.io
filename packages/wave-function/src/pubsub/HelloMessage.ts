import { Message } from "@fusion.io/bus";

export default class HelloMessage implements Message {
    constructor(private content: string) { }

    payload() {
        return JSON.stringify({
            content: this.content
        })
    }

    channel() {
        return 'hello'
    }
}
