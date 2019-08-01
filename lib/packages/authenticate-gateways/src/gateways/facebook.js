"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("@fusion.io/authenticate");
const protocols_1 = require("../protocols");
/**
 * @implements IdentityProvider
 */
class FacebookIdentityProvider {
    constructor(graphAPIVersion = '3.3') {
        this.graphAPIVersion = graphAPIVersion;
    }
    provide({ access_token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield protocols_1.callAPI({
                url: `https://graph.facebook.com/v${this.graphAPIVersion}/me`,
                qs: { access_token },
                json: true
            });
            return { access_token, profile: response.body };
        });
    }
}
exports.createGateway = (framework, options, provider) => {
    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Facebook gateway does not support framework [${framework}]`);
    }
    options = Object.assign({}, options, { host: 'https://graph.facebook.com', path: '/oauth/authorize' });
    const protocol = 'express' === framework ? new protocols_1.ExpressOAuth2(options) : new protocols_1.KoaOAuth2(options);
    const identityProvider = new authenticate_1.IdentityProviderChain([
        new FacebookIdentityProvider(options['graphAPIVersion'] || '3.3'),
        provider
    ]);
    return new authenticate_1.Gateway(protocol, identityProvider);
};
/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
exports.createExpressGateway = (options, provider) => {
    return exports.createGateway('express', options, provider);
};
/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
exports.createKoaGateway = (options, provider) => {
    return exports.createGateway('koa', options, provider);
};
//# sourceMappingURL=facebook.js.map