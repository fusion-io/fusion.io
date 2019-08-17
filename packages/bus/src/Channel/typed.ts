import { tokamak } from "@fusion.io/core";
import MessageManager from "./MessageManager";

export default (MessageType: {new(args: any[]): {}}) => async (message: any, next: Function) => {
    const messageManager = tokamak.make<MessageManager>(MessageManager);

    return next(await messageManager.deserialize(MessageType, message));
}
