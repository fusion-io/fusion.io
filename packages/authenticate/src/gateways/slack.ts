import Gateway from "../Gateway";
import IdentityProviderChain from "../IdentityProviderChain";
import { IdentityProvider } from "../Contracts";
import { ExpressOAuth2, KoaOAuth2 } from "../protocols";

declare type Credential = {
    access_token: string,
    user: Object,
    team: Object
}

/**
 * @implements IdentityProvider
 */
class SlackIDP implements IdentityProvider {
    async provide({ access_token, user, team }: Credential) {
        return { access_token, profile: user,  team } ;
    }
}

export const createSlackGateway = (framework: string, options: any, provider: IdentityProvider) => {

    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Slack gateway does not support framework [${framework}]`);
    }

    options = {
        ...options,
        host: 'https://slack.com',
        path: '/oauth/authorize',
        tokenPath: 'https://slack.com/api/oauth.access'
    };

    const Protocol         = 'express' === framework ? ExpressOAuth2 : KoaOAuth2;
    const protocol         = new Protocol(options);
    const identityProvider = new IdentityProviderChain([new SlackIDP(), provider]);

    return new Gateway(protocol, identityProvider);
};

/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
export const createSlackExpressGateway = (options: any, provider: IdentityProvider) => {
    return createSlackGateway('express', options, provider);
};

/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
export const createSlackKoaGateway = (options: any, provider: IdentityProvider) => {
    return createSlackGateway('koa', options, provider);
};
