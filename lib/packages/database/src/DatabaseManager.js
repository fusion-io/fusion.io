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
const knex_1 = __importDefault(require("knex"));
const core_1 = require("@fusion.io/core");
/**
 * Driver that wraps knex.
 * Since the knex supports multiple driver by itself.
 * So the DatabaseManager don't need to have many drivers.
 * Just one 'knex' driver is enough.
 *
 */
class KnexWrappedDriver {
    /**
     * Install a knex connection into the manager
     * as an adapter
     *
     * @param config
     */
    install(config) {
        return knex_1.default(config.options);
    }
}
exports.KnexWrappedDriver = KnexWrappedDriver;
let DatabaseManager = class DatabaseManager extends core_1.Manager {
    /**
     * Wrap and converts the database configuration to manager-like configuration.
     *
     * @param database
     */
    constructor({ database }) {
        const connectionConfig = database.connections;
        const managerConfig = { use: database.use, adapters: {} };
        for (let key in connectionConfig) {
            managerConfig.adapters[key] = {
                options: connectionConfig[key],
                driver: 'knex'
            };
        }
        super(managerConfig);
        super.extends('knex', new KnexWrappedDriver());
    }
    /**
     *
     * @param connection
     */
    connection(connection) {
        return super.adapter(connection);
    }
};
DatabaseManager = __decorate([
    core_1.singleton('config'),
    __metadata("design:paramtypes", [Object])
], DatabaseManager);
exports.default = DatabaseManager;
//# sourceMappingURL=DatabaseManager.js.map