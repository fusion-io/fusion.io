/**
 * The route definition list. Normally it's a result of a HttpResolver.resolveController()
 */
export default class RouteDefinitions {

    /**
     *
     * @param definitions
     */
    constructor(definitions = []) {
        this.definitions = definitions;
    }

    /**
     * Apply the route definitions.
     *
     * @param router
     */
    apply(router) {
        this.definitions.forEach(definition => {
            const {method, url, name, handler, middlewares } = definition;

            router[method](name, url, ...middlewares, handler);
        });
    }
}
