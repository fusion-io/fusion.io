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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = __importDefault(require("util"));
const authenticate_1 = require("@fusion.io/authenticate");
const protocols_1 = require("../protocols");
const verifyJWT = util_1.default.promisify(jsonwebtoken_1.default.verify);
/**
 * @implements IdentityProvider
 */
class JWTIdentityProvider {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    provide({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = yield verifyJWT(token, this.privateKey);
                return { token, payload };
            }
            catch (e) {
                throw new authenticate_1.UnAuthenticated(`JWT Signature invalid. Reason: ${e}`);
            }
        });
    }
}
exports.createGateway = (framework, privateKey, provider) => {
    if (framework !== 'koa' && framework !== 'express' && framework !== 'socket.io') {
        throw new Error(`JWT gateway does not support framework [${framework}]`);
    }
    let Protocol = null;
    if ('koa' === framework) {
        Protocol = protocols_1.KoaToken;
    }
    else if ('express' === framework) {
        Protocol = protocols_1.ExpressToken;
    }
    else {
        Protocol = protocols_1.SocketIOToken;
    }
    return new authenticate_1.Gateway(new Protocol(), new authenticate_1.IdentityProviderChain([new JWTIdentityProvider(privateKey), provider]));
};
exports.createExpressGateway = (privateKey, provider) => {
    return exports.createGateway('express', privateKey, provider);
};
exports.createKoaGateway = (privateKey, provider) => {
    return exports.createGateway('koa', privateKey, provider);
};
exports.createSocketIOGateway = (privateKey, provider) => {
    return exports.createGateway('socket.io', privateKey, provider);
};
//# sourceMappingURL=jwt.js.map