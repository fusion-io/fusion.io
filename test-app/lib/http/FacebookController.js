"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@fusion.io/http");
const container_1 = require("@fusion.io/container");
const HelloWorldService_1 = __importDefault(require("./HelloWorldService"));
let FacebookController = class FacebookController extends http_1.Controller {
    handleFacebookUser(context, next, service) {
        context.body = {
            message: service.run()
        };
    }
};
__decorate([
    container_1.inject(HelloWorldService_1.default),
    http_1.route('get', '/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, HelloWorldService_1.default]),
    __metadata("design:returntype", void 0)
], FacebookController.prototype, "handleFacebookUser", null);
FacebookController = __decorate([
    container_1.singleton()
], FacebookController);
exports.default = FacebookController;
