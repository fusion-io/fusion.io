import { Manager } from "@fusion.io/core";
import { Mountable } from "./Contracts";
import Gateway from "./Gateway";

/**
 * The user friendly configuration for authenticator
 */
export type AuthenticatorConfiguration = {
    default: string,
    gateways: {
        [name:string]: {
            gateway: "string",
            options: any
        }
    }
}

/**
 * An authenticator service. It its simplest form, it managing
 * gateways.
 */
export class Authenticator extends Manager<Gateway> {

    bootstrap(config: AuthenticatorConfiguration) {

        const standardAdapterConfiguration =
            Object.entries(config.gateways)
                .reduce((merged, [gatewayName, {gateway, options}]) => ({
                    ...merged,
                    [gatewayName]: { driver: gateway, options}
                }), {})
            ;

        return this.configure({
            default: config.default,
            adapters: standardAdapterConfiguration
        });
    }

    /**
     * Authenticate a context by a given gateway.
     *
     * @param gateway
     * @param context
     */
    public authenticate(gateway: string, context: Object) {
        return this.adapter(gateway).authenticate(context);
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
            const protocol = this.adapter(gateway).protocol;

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
}
