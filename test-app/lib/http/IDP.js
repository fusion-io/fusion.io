"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IDP {
    async provide({ access_token, profile }) {
        console.log(profile);
        return profile;
    }
}
exports.default = IDP;
