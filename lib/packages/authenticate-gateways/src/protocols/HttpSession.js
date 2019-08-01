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
class HttpSession {
    constructor(sessionKey = 'credential') {
        this.sessionKey = sessionKey;
    }
    resolve({ session, httpContext: { request } }) {
        return __awaiter(this, void 0, void 0, function* () {
            session = session || request.session;
            if (!session) {
                throw new Error("Session is not started");
            }
            if (!session[this.sessionKey]) {
                throw new authenticate_1.UnAuthenticated("UnAuthenticated");
            }
            return session[this.sessionKey];
        });
    }
}
exports.default = HttpSession;
//# sourceMappingURL=HttpSession.js.map