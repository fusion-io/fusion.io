/**
 * Chaining providers together to provide the final result as an identity.
 *
 * @implements IdentityProvider
 */
import { Credential, IdentityProvider } from "./Contracts";
export default class IdentityProviderChain implements IdentityProvider {
    private chains;
    /**
     *
     * @param {IdentityProvider[]} chains
     */
    constructor(chains?: Array<IdentityProvider>);
    /**
     *
     * @param credential
     * @return {Promise<*>}
     */
    provide(credential: Credential): Promise<any>;
}
