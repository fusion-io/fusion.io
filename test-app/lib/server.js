"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fusion.io/core");
const http_1 = require("@fusion.io/http");
const fuse_1 = __importDefault(require("./fuse"));
const server = core_1.container.make(http_1.Kernel);
const router = core_1.container.make(http_1.Router);
fuse_1.default.start();
server.use(router.routes());
server.listen(3000);
