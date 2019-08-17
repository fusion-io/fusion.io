import { ChannelController, channel, typed } from "@fusion.io/bus";
import { singleton } from "@fusion.io/proton";
import HelloMessage from "./HelloMessage";

@singleton()
export default class HelloWorldController extends ChannelController {

    @channel('hello', typed(HelloMessage))
    onHello(message: HelloMessage) {
        console.log(message);
    }
}
