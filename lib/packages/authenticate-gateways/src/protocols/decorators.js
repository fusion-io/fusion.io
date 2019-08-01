"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("@fusion.io/authenticate");
function mountExpress(Protocol) {
    return class extends Protocol {
        mount(consumer) {
            return (request, response, next) => {
                consumer(Object.assign({}, request.body, { context: 'http', httpContext: { request, response } }))
                    .then(identity => {
                    request.identity = identity;
                    next();
                })
                    .catch(error => {
                    // If authentication aborted. We'll just skip this route.
                    if (error instanceof authenticate_1.Aborted) {
                        return null;
                    }
                    next(error);
                });
            };
        }
    };
}
exports.mountExpress = mountExpress;
function mountKoa(Protocol) {
    return class extends Protocol {
        mount(consumer) {
            return (ctx, next) => consumer(Object.assign({}, ctx.request.body, { context: 'http', httpContext: ctx })).then(identity => {
                ctx.identity = identity;
                return next();
            }).catch(error => {
                // If authentication aborted. We'll just skip this route.
                if (!(error instanceof authenticate_1.Aborted)) {
                    throw error;
                }
            });
        }
    };
}
exports.mountKoa = mountKoa;
function mountSocketIO(Protocol) {
    return class extends Protocol {
        mount(consumer) {
            return (socket, next) => consumer(Object.assign({ context: 'socket' }, socket.handshake.query, { socketContext: socket })).then(identity => {
                socket.identity = identity;
                next();
            }).catch((error) => {
                next(error);
            });
        }
    };
}
exports.mountSocketIO = mountSocketIO;
//# sourceMappingURL=decorators.js.map