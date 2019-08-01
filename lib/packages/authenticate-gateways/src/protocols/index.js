"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HeadlessLocal_1 = __importDefault(require("./HeadlessLocal"));
exports.HeadlessLocal = HeadlessLocal_1.default;
const HttpOAuth2_1 = __importDefault(require("./HttpOAuth2"));
exports.HttpOAuth2 = HttpOAuth2_1.default;
const HttpSession_1 = __importDefault(require("./HttpSession"));
exports.HttpSession = HttpSession_1.default;
const HttpTokenBearer_1 = __importDefault(require("./HttpTokenBearer"));
exports.HttpTokenBearer = HttpTokenBearer_1.default;
const SocketIOToken_1 = __importDefault(require("./SocketIOToken"));
exports.SocketIOToken = SocketIOToken_1.default;
const util_1 = __importDefault(require("util"));
const request_1 = __importDefault(require("request"));
const decorators_1 = require("./decorators");
exports.callAPI = (options) => util_1.default.promisify(request_1.default)(options, undefined);
exports.KoaLocal = decorators_1.mountKoa(HeadlessLocal_1.default);
exports.ExpressLocal = decorators_1.mountExpress(HeadlessLocal_1.default);
exports.SocketIOLocal = decorators_1.mountSocketIO(HeadlessLocal_1.default);
exports.KoaOAuth2 = decorators_1.mountKoa(HttpOAuth2_1.default);
exports.ExpressOAuth2 = decorators_1.mountExpress(HttpOAuth2_1.default);
exports.KoaToken = decorators_1.mountKoa(HttpTokenBearer_1.default);
exports.ExpressToken = decorators_1.mountExpress(HttpTokenBearer_1.default);
exports.KoaSession = decorators_1.mountKoa(HttpSession_1.default);
exports.ExpressSession = decorators_1.mountExpress(HttpSession_1.default);
//# sourceMappingURL=index.js.map