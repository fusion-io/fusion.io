"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("@fusion.io/authenticate");
const protocols_1 = require("../protocols");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @implements IdentityProvider
 */
class GoogleIDP {
    constructor(clientSecret) {
        this.clientSecret = clientSecret;
    }
    provide({ access_token, id_token }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = jsonwebtoken_1.default.decode(id_token, this.clientSecret);
                return { access_token, id_token, profile };
            }
            catch (error) {
                throw new authenticate_1.UnAuthenticated(`Invalid id token. Reason: ${error.message}`);
            }
        });
    }
}
exports.createGateway = (framework, options, provider) => {
    if (framework !== 'koa' && framework !== 'express') {
        throw new Error(`Google gateway does not support framework [${framework}]`);
    }
    options = Object.assign({}, options, { tokenPath: 'https://oauth2.googleapis.com/token', host: 'https://accounts.google.com', path: '/o/oauth2/v2/auth' });
    const Protocol = 'express' === framework ? protocols_1.ExpressOAuth2 : protocols_1.KoaOAuth2;
    const protocol = new Protocol(options);
    const identityProvider = new authenticate_1.IdentityProviderChain([new GoogleIDP(options['ua']), provider]);
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
//# sourceMappingURL=google.js.map