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
 * @implements Mountable
 */
class SocketIOToken {
    mount(consumer) {
        return (socket, next) => {
            consumer({ socket }).then(identity => {
                socket.identity = identity;
                next();
            }).catch(error => {
                if (error instanceof authenticate_1.UnAuthenticated) {
                    next(error);
                }
                else {
                    throw error;
                }
            });
        };
    }
    resolve({ socket: { handshake } }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!handshake.query.token) {
                throw new authenticate_1.UnAuthenticated("No token provided");
            }
            return { token: handshake.query.token };
        });
    }
}
exports.default = SocketIOToken;
//# sourceMappingURL=SocketIOToken.js.map