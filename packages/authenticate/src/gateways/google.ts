import Gateway from "../Gateway";
import IdentityProviderChain from "../IdentityProviderChain"
import UnAuthenticated from "../UnAuthenticated";
import { IdentityProvider } from "../Contracts";
import { ExpressOAuth2, KoaOAuth2 } from "../protocols";


declare type Credential = {
    access_token: string,
    id_token: string
}

/**
 * @implements IdentityProvider
 */
class GoogleIDP implements IdentityProvider {
    constructor(private readonly clientSecret: string) { }

    async provide({access_token, id_token}: Credential) {
        const jwt = require("jsonwebtoken");

        try {
            const profile = jwt.decode(id_token, ( this.clientSecret ));

            return { access_token, id_token, profile };
        } catch (error) {
            throw new UnAuthenticated(`Invalid id token. Reason: ${error.message}`);
        }
    }
}

export const createGoogleGateway = (framework: string, options: any, provider: IdentityProvider) => {

    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Google gateway does not support framework [${framework}]`);
    }

    options = { ...options, tokenPath: 'https://oauth2.googleapis.com/token', host: 'https://accounts.google.com', path: '/o/oauth2/v2/auth' };

    const Protocol         = 'express' === framework ? ExpressOAuth2 : KoaOAuth2;
    const protocol         = new Protocol(options);
    const identityProvider = new IdentityProviderChain([new GoogleIDP(options['ua']), provider]);

    return new Gateway(protocol, identityProvider);
};

/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
export const createGoogleExpressGateway = (options: any, provider: IdentityProvider) => {
    return createGoogleGateway('express', options, provider);
};

/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
export const createGoogleKoaGateway = (options: any, provider: IdentityProvider) => {
    return createGoogleGateway('koa', options, provider);
};
