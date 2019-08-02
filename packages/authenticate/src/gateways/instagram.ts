import Gateway from "../Gateway";
import IdentityProviderChain from "../IdentityProviderChain"
import { IdentityProvider } from "../Contracts";
import { ExpressOAuth2, KoaOAuth2 } from "../protocols";

declare type Credential = {
    access_token: string,
    user: string
}

/**
 * @implements IdentityProvider
 */
class InstagramIDP implements IdentityProvider {
    async provide({access_token, user}: Credential) {

        return { access_token, profile: user };
    }
}

export const createInstagramGateway = (framework: string, options: any, provider: IdentityProvider) => {

    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Instagram gateway does not support framework [${framework}]`);
    }

    options = { ...options, host: 'https://api.instagram.com', path: '/oauth/authorize' };

    const Protocol         = 'express' === framework ? ExpressOAuth2 : KoaOAuth2;
    const protocol         = new Protocol(options);
    const identityProvider = new IdentityProviderChain([new InstagramIDP(), provider]);

    return new Gateway(protocol, identityProvider);
};

/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
export const createInstagramExpressGateway = (options: any, provider: IdentityProvider) => {
    return createInstagramGateway('express', options, provider);
};

/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
export const createInstagramKoaGateway = (options: any, provider: IdentityProvider) => {
    return createInstagramGateway('koa', options, provider);
};
