import { Manager, AdapterConfiguration, singleton } from "@fusion.io/core";
import { IdentityProvider, Mountable, Protocol } from "./Contracts";
import Gateway from "./Gateway";

/**
 * The user friendly configuration for authenticator
 */
export type AuthenticatorConfiguration = {
    default: string,
    gateways: {
        [name:string]: {
            protocol: "string",
            options: any
        }
    }
}

export type GatewayConnector = (options?: any) => IdentityProvider|IdentityProvider[];

/**
 * An authenticator service. It its simplest form, it managing
 * gateways
 *
 */
@singleton()
export class Authenticator extends Manager<Gateway> {

    private gatewayConnectors: Map<string, GatewayConnector> = new Map<string, GatewayConnector>();

    /**
     * Connect an IDP to the gateway
     *
     * @param gateway
     * @param connector
     */
    public connect(gateway: string, connector: GatewayConnector) {
        this.gatewayConnectors.set(gateway, connector);
        return this;
    }

    /**
     *
     * @param config
     */
    public bootstrap(config: AuthenticatorConfiguration) {

        const standardAdapterConfiguration =
            Object.entries(config.gateways)
                .reduce((merged, [gatewayName, { protocol, options }]) => ({
                    ...merged,
                    [gatewayName]: {
                        driver: protocol,
                        options: {
                            ...options,

                            // We'll allow the consumer code connects
                            // its IDP to the gateway
                            connector: this.gatewayConnectors.get(gatewayName)
                        }
                    }
                }), {})
            ;

        return this.configure({
            default: config.default,
            adapters: standardAdapterConfiguration
        });
    }

    /**
     * Overrides the install adapter method to connect the gateway with IDP
     *
     * @param configuration
     */
    protected installAdapter(configuration: AdapterConfiguration) {
        const gateway = super.installAdapter(configuration);

        if (configuration.options.connector) {
            let providers = configuration.options.connector(configuration.options);
            if (!(providers instanceof Array)) providers = [providers];

            (providers as IdentityProvider[]).forEach(provider => gateway.provider.push(provider));
        }

        return gateway;
    }

    /**
     * Authenticate a context by a given gateway
     *
     * @param gateway
     * @param context
     */
    public authenticate(gateway: string, context: Object) {
        return this.adapter(gateway).authenticate(context);
    }

    /**
     * Returning a connection which can be used to mount to
     * the transport layer
     *
     * Normally, we need to authenticate over Http, then guard() will
     * return a middleware
     *
     * If we authenticate over Socket, then guard() will return the
     * socket connection middleware
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
            const protocol: unknown = this.adapter(gateway).protocol;

            if ('function' !== typeof (protocol as Mountable).mount) {
                throw new Error(
                    `The protocol [${(protocol as Protocol).constructor.name}] of the gateway [${gateway}]` +
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
