"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aborted extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = Aborted;
//# sourceMappingURL=Aborted.js.map