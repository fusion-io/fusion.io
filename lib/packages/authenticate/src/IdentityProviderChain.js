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
class IdentityProviderChain {
    /**
     *
     * @param {IdentityProvider[]} chains
     */
    constructor(chains = []) {
        this.chains = chains;
    }
    /**
     *
     * @param credential
     * @return {Promise<*>}
     */
    provide(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            let identityChain = credential;
            for (let index = 0; index < this.chains.length; index++) {
                const idp = this.chains[index];
                identityChain = yield idp.provide(identityChain);
                if (!identityChain) {
                    return null;
                }
            }
            return identityChain;
        });
    }
}
exports.default = IdentityProviderChain;
//# sourceMappingURL=IdentityProviderChain.js.map