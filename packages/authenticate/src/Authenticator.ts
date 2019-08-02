import { IdentityProvider, Mountable, Protocol } from "./Contracts";
import Gateway from "./Gateway";

/**
 * An authenticator service. It its simplest form, it managing
 * gateways.
 */
export default class Authenticator {

    private gateways: Map<string, Gateway> = new Map<string, Gateway>();

    /**
     * Register an existing gateway
     *
     * @param gateName
     * @param gateInstance
     */
    public register(gateName: string, gateInstance: Gateway) {
        this.gateways.set(gateName, gateInstance);
        return this;
    }

    /**
     * Create a new gateway
     *
     * @param gateway
     * @param protocol
     * @param provider
     */
    public gate(gateway: string, protocol: Protocol, provider: IdentityProvider) {
        return this.register(gateway, new Gateway(protocol, provider));
    }

    /**
     * Authenticate a context by a given gateway.
     *
     * @param gateway
     * @param context
     */
    public authenticate(gateway: string, context: Object) {
        return this.getOrFail(gateway).authenticate(context);
    }

    /**
     * Returning a connection which can be used to mount to
     * the transport layer.
     *
     * Normally, we need to authenticate over Http, then guard() will
     * return a middleware.
     *
     * If we authenticate over Socket, then guard() will return the
     * socket connection middleware.
     *
     * @param gateway
     * @return {mount}
     */
    public guard(gateway: string) {

        // First we'll wrap exposed function. By doing this way, the logic for checking
        // the Gateway existence will be done in the mounted context.
        // Not the initial setup context.
        return (...arg: any[]) => {

            // Now we are actually inside the context.
            // we check for the protocol of the gateway
            const protocol = this.getOrFail(gateway).protocol;

            if ('function' !== typeof (protocol as Mountable).mount) {
                throw new Error(
                    `The protocol [${protocol.constructor.name}] of the gateway [${gateway}]` +
                    ` does not support mounting to a framework.`
                );
            }

            // Create a consumer function which actually run the authentication process
            const consumer = (context: Object) => this.authenticate(gateway, context);

            // Get give the consumer to the protocol
            // and get back the mount function.
            const mountFunction = (protocol as Mountable).mount(consumer);

            // Lastly, we'll trigger the mountFunction here here
            return mountFunction(...arg);
        }
    }

    /**
     * Get a gateway by its name.
     *
     * @param gateway
     */
    protected getOrFail(gateway: string): Gateway {
        const gatewayInstance = this.gateways.get(gateway);

        if (!gatewayInstance) {
            throw new Error(`Gateway [${gateway}] is not registered.`);
        }

        return gatewayInstance;
    }
}
