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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fusion.io/core");
const http_1 = require("@fusion.io/http");
const database_1 = require("@fusion.io/database");
let HelloController = class HelloController extends http_1.Controller {
    constructor(manager) {
        super();
        this.manager = manager;
    }
    async index(context) {
        console.log(this.manager.connection());
        // const users = await this.manager.connection()
        //     .select()
        //     .from('users')
        // ;
        context.body = {
            users: 'xxxs'
        };
    }
};
__decorate([
    http_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelloController.prototype, "index", null);
HelloController = __decorate([
    core_1.singleton(database_1.DatabaseManager),
    __metadata("design:paramtypes", [database_1.DatabaseManager])
], HelloController);
exports.default = HelloController;
