import {container, Manager, singleton} from "@fusion.io/core"
import {Message, MessageConstructor} from "./Message";
import {EventEmitter} from "events";
import Bus from "./Bus";

/**
 *
 */
export class HubError extends Error { }

/**
 * Shape of the HubPayload
 */
export type HubPayload = {type: string, payload: any};

/**
 * The message consumer
 *
 */
export type MessageConsumer = (message: Message|any) => Promise<any>;

/**
 * Hub is the central place for managing buses
 *
 */
@singleton()
export default class Hub extends Manager<Bus> {

    private eventEmitter = new EventEmitter();

    /**
     *
     * @param transportables
     */
    constructor(private transportables = new Map<string, MessageConstructor>()) {
        super(container, "fusion.hub.bus");
    }

    /**
     * Publishes/Sends a message
     *
     * @param message The message
     * @param via The bus that will be used for transportation
     */
    public dispatch(message: Message, via?: string) {

        if (!this.canTransport(message.constructor as MessageConstructor)) {
            throw new HubError(`Could not publish this message. ` +
            `Register the message before publish it by calling [.register(MessageConstructor)]`)
        }

        return this.adapter(via).send({type: message.constructor.name, payload: message.toPayload()});
    }

    /**
     * Determine if this message type can be transported via this Hub
     *
     * @param messageTypes
     */
    public transportable(...messageTypes: MessageConstructor[]) {
        messageTypes.forEach(messageType => {
            if (this.transportables.has(messageType.name)) {
                throw new HubError(`Message type [${messageType}] already registered.`
                    + `Possible naming collision`
                );
            }

            this.transportables.set(messageType.name, messageType);
        });

        return this;
    }

    /**
     * Pull for messages in a certain bus
     *
     * @param consumer
     * @param at
     */
    public onMessage(consumer: MessageConsumer, at?: string) {
        this.adapter(at).listen((messagePayload: HubPayload) => {
            if (this.isHubPayload(messagePayload)) {

                const message = (this.transportables.get(messagePayload.type) as MessageConstructor)
                    .fromPayload(messagePayload.payload)
                ;

                return consumer(message);
            } else {
                this.eventEmitter.emit('ALIEN_MESSAGE', messagePayload)
            }
        });
    }

    /**
     * Handle when the Hub could not proceed the payload
     *
     * @param handler
     * @param at
     */
    public onAlienMessage(handler: (messagePayload: any) => void, at?: string) {
        this.eventEmitter.on('ALIEN_MESSAGE', handler);

        return this;
    }

    /**
     * Determine if the incoming message is a valid HubPayload
     *
     * @param maybeHubPayload
     */
    private isHubPayload(maybeHubPayload: any) {

        const { type, payload } = maybeHubPayload;

        return (type && this.transportables.has(type) && payload);
    }

    /**
     * Tell the Hub that this message type is transportable.
     *
     * @param messageType
     */
    private canTransport(messageType: MessageConstructor) {
        return (this.transportables.has(messageType.name)
            && (this.transportables.get(messageType.name) === messageType)
        );
    }
}
