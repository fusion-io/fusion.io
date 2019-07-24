"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const core_1 = require("@fusion.io/core");
const server = new koa_1.default();
const app = new core_1.Application();
app.bootstrap([]);
console.log(app);
