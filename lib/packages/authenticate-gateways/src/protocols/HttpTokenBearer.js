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
/**
 * @implements Protocol
 */
class HttpTokenBearer {
    /**
     * Resolve the token from the request
     *
     * @param request
     * @return {*}
     */
    resolve({ httpContext: { request } }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.headers['authorization']) {
                let bearer = request.headers['authorization'];
                if (!bearer.startsWith('bearer ')) {
                    throw new authenticate_1.UnAuthenticated("No token provided");
                }
                return { token: bearer.replace('bearer ', '') };
            }
            if (request.query['token']) {
                return { token: request.query['token'] };
            }
            if (request.body && request.body['token']) {
                return { token: request.body['token'] };
            }
            throw new authenticate_1.UnAuthenticated("No token provided");
        });
    }
}
exports.default = HttpTokenBearer;
//# sourceMappingURL=HttpTokenBearer.js.map