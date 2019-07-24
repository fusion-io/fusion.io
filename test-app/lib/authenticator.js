"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fusion.io/authenticate/lib/core");
const jwt_1 = require("@fusion.io/authenticate/lib/gateways/jwt");
const IDP_1 = __importDefault(require("./http/IDP"));
core_1.authenticator
    .register('token', jwt_1.createKoaGateway('xxx', new IDP_1.default()));
exports.default = core_1.authenticator;
