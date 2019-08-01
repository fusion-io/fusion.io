"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error that will be thrown if the authentication process
 * was failed.
 */
class UnAuthenticated extends Error {
    get code() {
        return 401;
    }
}
exports.default = UnAuthenticated;
//# sourceMappingURL=UnAuthenticated.js.map