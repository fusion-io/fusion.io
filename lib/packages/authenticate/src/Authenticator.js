"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gateway_1 = __importDefault(require("./Gateway"));
/**
 * An authenticator service. It its simplest form, it managing
 * gateways.
 */
class Authenticator {
    constructor() {
        this.gateways = new Map();
    }
    /**
     * Register an existing gateway
     *
     * @param gateName
     * @param gateInstance
     */
    register(gateName, gateInstance) {
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
    gate(gateway, protocol, provider) {
        return this.register(gateway, new Gateway_1.default(protocol, provider));
    }
    /**
     * Authenticate a context by a given gateway.
     *
     * @param gateway
     * @param context
     */
    authenticate(gateway, context) {
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
    guard(gateway) {
        // First we'll wrap exposed function. By doing this way, the logic for checking
        // the Gateway existence will be done in the mounted context.
        // Not the initial setup context.
        return (...arg) => {
            // Now we are actually inside the context.
            // we check for the protocol of the gateway
            const protocol = this.getOrFail(gateway).protocol;
            if ('function' !== typeof protocol.mount) {
                throw new Error(`The protocol [${protocol.constructor.name}] of the gateway [${gateway}]` +
                    ` does not support mounting to a framework.`);
            }
            // Create a consumer function which actually run the authentication process
            const consumer = (context) => this.authenticate(gateway, context);
            // Get give the consumer to the protocol
            // and get back the mount function.
            const mountFunction = protocol.mount(consumer);
            // Lastly, we'll trigger the mountFunction here here
            return mountFunction(...arg);
        };
    }
    /**
     * Get a gateway by its name.
     *
     * @param gateway
     */
    getOrFail(gateway) {
        const gatewayInstance = this.gateways.get(gateway);
        if (!gatewayInstance) {
            throw new Error(`Gateway [${gateway}] is not registered.`);
        }
        return gatewayInstance;
    }
}
exports.default = Authenticator;
//# sourceMappingURL=Authenticator.js.map