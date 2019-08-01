"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("./Controller"));
exports.Controller = Controller_1.default;
const Router_1 = __importDefault(require("./Router"));
exports.Router = Router_1.default;
const Kernel_1 = __importDefault(require("./Kernel"));
exports.Kernel = Kernel_1.default;
__export(require("./decorators"));
exports.plasma = {
    dependencies: [],
    bootstrapper: () => { }
};
//# sourceMappingURL=index.js.map