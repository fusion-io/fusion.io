"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@fusion.io/http");
const HelloController_1 = __importDefault(require("./controllers/HelloController"));
exports.plasma = {
    dependencies: [http_1.Router],
    bootstrapper: (router) => {
        router.controller(HelloController_1.default);
    }
};
