import util from 'util';

import Gateway from "../Gateway";
import {IdentityProvider} from "../Contracts";
import IdentityProviderChain from "../IdentityProviderChain";
import UnAuthenticated from "../UnAuthenticated";

import {
    SocketIOToken,
    KoaToken,
    ExpressToken
} from "../protocols";

declare type Credential = {token: string};

/**
 * @implements IdentityProvider
 */
class JWTIdentityProvider implements IdentityProvider {

    constructor(private readonly privateKey: string) { }

    async provide({token}: Credential) {
        const jwt = require('jsonwebtoken');
        const verifyJWT = util.promisify(jwt.verify);

        try {
            const payload = await verifyJWT(token, this.privateKey);
            return {token, payload};
        } catch (e) {
            throw new UnAuthenticated(`JWT Signature invalid. Reason: ${e}`);
        }
    }
}

export const createJWTGateway = (framework: string, privateKey: string, provider: IdentityProvider) => {
    if (framework !== 'koa' && framework !== 'express' && framework !== 'socket.io') {
        throw new Error(`JWT gateway does not support framework [${framework}]`);
    }

    let Protocol = null;

    if ('koa' === framework) {
        Protocol = KoaToken;
    } else if ('express' === framework) {
        Protocol = ExpressToken;
    } else {
        Protocol = SocketIOToken;
    }

    return new Gateway(new Protocol(), new IdentityProviderChain([new JWTIdentityProvider(privateKey), provider]))
};

export const createJWTExpressGateway = (privateKey: string, provider: IdentityProvider) => {
    return createJWTGateway('express', privateKey, provider);
};

export const createJWTKoaGateway = (privateKey: string, provider: IdentityProvider) => {
    return createJWTGateway('koa', privateKey, provider);
};

export const createJWTSocketIOGateway = (privateKey: string, provider: IdentityProvider) => {
    return createJWTGateway('socket.io', privateKey, provider);
};
