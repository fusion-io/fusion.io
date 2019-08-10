import { IdentityProvider, MountableProtocol, Protocol } from "./Contracts";
import UnAuthenticated from "./UnAuthenticated";
import {IdentityProviderChain} from "./index";
/**
 * A gate to determine of in the given context, the given Credential is
 * authenticated or not
 *
 */
export default class Gateway {

    /**
     * The Gateway always holds an IdentityProviderChain
     * as default IDP
     */
    public provider = new IdentityProviderChain();

    /**
     *
     * @param protocol
     */
    constructor(public protocol: Protocol) { }

    /**
     * Perform the authentication process with a given context.
     *
     */
    public async authenticate(context: Object) {
        const credential = await this.protocol.resolve(context);
        const identity   = await this.provider.provide(credential);

        if (!identity) {
            throw new UnAuthenticated("Identity not found");
        }

        return identity;
    }
}
