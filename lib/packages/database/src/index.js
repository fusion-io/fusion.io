"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseManager_1 = __importDefault(require("./DatabaseManager"));
exports.DatabaseManager = DatabaseManager_1.default;
exports.plasma = {
    dependencies: ['config', DatabaseManager_1.default],
    bootstrapper: () => {
    }
};
//# sourceMappingURL=index.js.map