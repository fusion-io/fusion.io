import Gateway from "../Gateway";
import {IdentityProvider} from "../Contracts";
import IdentityProviderChain from "../IdentityProviderChain"
import {ExpressOAuth2, KoaOAuth2, callAPI} from "../protocols";

declare type Credential = {
    access_token: string
};


/**
 * @implements IdentityProvider
 */
class FacebookIdentityProvider implements IdentityProvider {

    constructor(private readonly graphAPIVersion = '3.3') { }

    public async provide({access_token}: Credential) {
        const response = await callAPI({
            url: `https://graph.facebook.com/v${this.graphAPIVersion}/me`,
            qs: {access_token},
            json: true
        });

        return { access_token, profile: response.body };
    }
}

export const createGateway = (framework: string, options: any, provider: IdentityProvider) => {


    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Facebook gateway does not support framework [${framework}]`);
    }

    options = { ...options, host: 'https://graph.facebook.com', path: '/oauth/authorize' };

    const protocol         = 'express' === framework ? new ExpressOAuth2(options) : new KoaOAuth2(options);
    const identityProvider = new IdentityProviderChain([
        new FacebookIdentityProvider(options['graphAPIVersion'] || '3.3'),
        provider
    ]);

    return new Gateway(protocol, identityProvider);
};

/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
export const createExpressGateway = (options: any, provider: IdentityProvider) => {
    return createGateway('express', options, provider);
};

/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
export const createKoaGateway = (options: any, provider: IdentityProvider) => {
    return createGateway('koa', options, provider);
};