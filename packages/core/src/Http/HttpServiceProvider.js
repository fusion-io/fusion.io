import ServiceProvider from "../utils/ServiceProvider";
import {Config, Url} from "../Contracts";
import lodash from 'lodash';
import HttpResolver from "./HttpResolver";
import Router from "./Router";
import Kernel from "./Kernel";
import UrlManager from "./UrlManager";
import ContextRedirect from "./ContextRedirect";

/**
 * Provide the Http Kernel & Http Router  configuration & behaviors
 *
 */
export default class HttpServiceProvider extends ServiceProvider {

    /**
     * The middleware groups.
     * It will helps us to work more efficient when applying middlewares by unit of logic
     *
     * @return {{}}
     */
    middlewareGroups() {
        return { }
    }

    /**
     * The list of global middleware that will be used
     *
     * @return {Array}
     */
    globalMiddlewares() {
        return []
    }

    /**
     * Register the http services
     *
     */
    register() {

        this.container.singleton(Kernel, (container) => {
            return new Kernel(container.make(HttpResolver));
        });

        this.container.singleton(Router, (container) => {
            return new Router({}, container.make(HttpResolver))
        });

        this.container.singleton(Url, (container) => {
            return new UrlManager(container.make(Router));
        });

        lodash.forIn(this.middlewareGroups(), (middlewares, groupName) => {
            this.container.value(HttpResolver.makeKeyNameForMiddlewareGroup(groupName), middlewares);
        });
    }

    /**
     * Bootstrap the HttpKernel
     *
     * @return {*|void}
     */
    bootstrapKernel() {
        const kernel    = this.container.make(Kernel);
        const config    = this.container.make(Config);

        kernel.keys = config.get('keys', []);

        kernel.use(ContextRedirect);

        // Apply global middlewares to the Kernel
        this.globalMiddlewares()
            .forEach(middleware => kernel.use(middleware))
        ;

        return kernel;
    }

    /**
     * Bootstrap the router(s).
     *
     * @return {*|void}
     */
    bootstrapRoutes() {
        const router    = this.container.make(Router);

        this.routing(router);

        return router;
    }

    /**
     * @inheritDoc
     */
    boot() {
        const kernel = this.bootstrapKernel();
        const router = this.bootstrapRoutes();

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());
    }

    /**
     * @abstract
     */
    routing() {

    }
}
