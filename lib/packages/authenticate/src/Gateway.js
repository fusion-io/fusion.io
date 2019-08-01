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
const UnAuthenticated_1 = __importDefault(require("./UnAuthenticated"));
/**
 * A gate to determine of in the given context, the given Credential is
 * authenticated or not.
 */
class Gateway {
    constructor(protocol, provider) {
        this.protocol = protocol;
        this.provider = provider;
    }
    /**
     * Perform the authentication process with a given context.
     *
     */
    authenticate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const credential = yield this.protocol.resolve(context);
            const identity = yield this.provider.provide(credential);
            if (!identity) {
                throw new UnAuthenticated_1.default("Identity not found");
            }
            return identity;
        });
    }
}
exports.default = Gateway;
//# sourceMappingURL=Gateway.js.map