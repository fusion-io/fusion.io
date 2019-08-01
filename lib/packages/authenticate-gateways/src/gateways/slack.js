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
class SlackIDP {
    provide({ access_token, user, team }) {
        return __awaiter(this, void 0, void 0, function* () {
            return { access_token, profile: user, team };
        });
    }
}
exports.createGateway = (framework, options, provider) => {
    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Slack gateway does not support framework [${framework}]`);
    }
    options = Object.assign({}, options, { host: 'https://slack.com', path: '/oauth/authorize', tokenPath: 'https://slack.com/api/oauth.access' });
    const Protocol = 'express' === framework ? protocols_1.ExpressOAuth2 : protocols_1.KoaOAuth2;
    const protocol = new Protocol(options);
    const identityProvider = new authenticate_1.IdentityProviderChain([new SlackIDP(), provider]);
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
//# sourceMappingURL=slack.js.map