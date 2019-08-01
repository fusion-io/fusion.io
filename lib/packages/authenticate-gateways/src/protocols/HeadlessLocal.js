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
class HeadlessLocal {
    constructor(options = { usernameField: 'username', passwordField: 'password' }) {
        this.options = options;
    }
    resolve(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameField = this.options['usernameField'] || 'username';
            const passwordField = this.options['passwordField'] || 'password';
            const username = context[usernameField];
            const password = context[passwordField];
            if (!username) {
                throw new authenticate_1.UnAuthenticated("Username is required");
            }
            if (!password) {
                throw new authenticate_1.UnAuthenticated("Password is required");
            }
            return { username, password };
        });
    }
}
exports.default = HeadlessLocal;
//# sourceMappingURL=HeadlessLocal.js.map