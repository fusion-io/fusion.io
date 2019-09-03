/**
 * Chaining providers together to provide the final result as an identity.
 *
 * @implements IdentityProvider
 */
import { Credential, IdentityProvider } from "./Contracts";

export default class IdentityProviderChain implements IdentityProvider {

    constructor(private chains: Array<IdentityProvider> = []) { }

    public push(provider: IdentityProvider) {
        this.chains.push(provider);
        return this;
    }

    public async provide(credential: Credential) {
        let identityChain: any = credential;

        for (let index = 0; index < this.chains.length; index++) {

            const idp: IdentityProvider = this.chains[index];

            identityChain = await idp.provide(identityChain);

            if (!identityChain) {
                return null;
            }
        }

        return identityChain;
    }
}
