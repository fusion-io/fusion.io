"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fusion.io/core");
exports.default = {
    initial: () => {
    },
    bootstrap: () => {
        core_1.router.group((groupRouter) => {
            groupRouter.prefix('/api/v1')
                .get('/message', (context) => {
                context.body = {
                    'test': 'api'
                };
            })
                .get('/message2', ((context) => {
                context.body = {
                    'test': 'api2'
                };
            }));
        });
    }
};
