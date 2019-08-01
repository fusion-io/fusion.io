import { IdentityProvider, Protocol } from "./Contracts";
import Gateway from "./Gateway";
/**
 * An authenticator service. It its simplest form, it managing
 * gateways.
 */
export default class Authenticator {
    private gateways;
    /**
     * Register an existing gateway
     *
     * @param gateName
     * @param gateInstance
     */
    register(gateName: string, gateInstance: Gateway): this;
    /**
     * Create a new gateway
     *
     * @param gateway
     * @param protocol
     * @param provider
     */
    gate(gateway: string, protocol: Protocol, provider: IdentityProvider): this;
    /**
     * Authenticate a context by a given gateway.
     *
     * @param gateway
     * @param context
     */
    authenticate(gateway: string, context: Object): Promise<import("./Contracts").Identity>;
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
    guard(gateway: string): (...arg: any[]) => any;
    /**
     * Get a gateway by its name.
     *
     * @param gateway
     */
    protected getOrFail(gateway: string): Gateway;
}
