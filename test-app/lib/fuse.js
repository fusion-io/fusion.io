"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@fusion.io/http");
const database_1 = require("@fusion.io/database");
const validation_1 = require("@fusion.io/validation");
const app_1 = require("./app");
const core_1 = require("@fusion.io/core");
const application = new core_1.Tokamak({
    database: {
        use: 'test',
        connections: {
            test: {
                client: 'sqlite3',
                connection: {
                    filename: __dirname + "/mydb.sqlite"
                }
            },
            test2: {}
        }
    }
});
exports.default = application
    .fuse(database_1.plasma)
    .fuse(http_1.plasma)
    .fuse(validation_1.plasma)
    .fuse(app_1.plasma);
