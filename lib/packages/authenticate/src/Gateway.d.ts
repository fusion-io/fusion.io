import { IdentityProvider, MountableProtocol } from "./Contracts";
/**
 * A gate to determine of in the given context, the given Credential is
 * authenticated or not.
 */
export default class Gateway {
    protocol: MountableProtocol;
    provider: IdentityProvider;
    constructor(protocol: MountableProtocol, provider: IdentityProvider);
    /**
     * Perform the authentication process with a given context.
     *
     */
    authenticate(context: Object): Promise<import("./Contracts").Identity>;
}
