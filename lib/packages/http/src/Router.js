"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Router_1;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const koa_router_1 = __importDefault(require("koa-router"));
const Controller_1 = __importDefault(require("./Controller"));
const core_1 = require("@fusion.io/core");
const Middleware_1 = require("./Middleware");
/**
 * We'll extends Koa
 */
let Router = Router_1 = class Router extends koa_router_1.default {
    /**
     * Register a route by controller
     *
     * @param Constructor
     */
    controller(Constructor) {
        const controller = core_1.container.make(Constructor);
        const controllerLevelMiddlewares = Constructor.middlewares.map(middleware => Middleware_1.middlewareResolver.resolve(middleware));
        const routes = Constructor.routes;
        routes.forEach(route => {
            const actionLevelMiddlewares = route.middlewares.map(mw => Middleware_1.middlewareResolver.resolve(mw));
            // @ts-ignore
            return this[route.method](`${Controller_1.default.name}.${route.action}`, route.url, ...controllerLevelMiddlewares, ...actionLevelMiddlewares, controller.wrap(route.action));
        });
        return this;
    }
    /**
     *
     * @param name
     * @param args
     */
    get(name, ...args) {
        super.get(name, ...args);
        return this;
    }
    /**
     *
     * @param name
     * @param args
     */
    post(name, ...args) {
        super.post(name, ...args);
        return this;
    }
    /**
     *
     * @param name
     * @param args
     */
    put(name, ...args) {
        super.put(name, ...args);
        return this;
    }
    /**
    *
    * @param name
    * @param args
    */
    patch(name, ...args) {
        super.patch(name, ...args);
        return this;
    }
    /**
     *
     * @param name
     * @param args
     */
    delete(name, ...args) {
        super.delete(name, ...args);
        return this;
    }
    /**
     * Group the routes. So we can apply configuration easier
     *
     * @param callback
     */
    group(callback) {
        const groupRouter = new Router_1();
        callback(groupRouter);
        this.use(groupRouter.routes());
        return this;
    }
};
Router = Router_1 = __decorate([
    core_1.singleton()
], Router);
exports.default = Router;
//# sourceMappingURL=Router.js.map