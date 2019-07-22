export default class UrlManager {

    constructor(router) {
        this.router = router;
    }

    url(routeNameOrPath, routeParameters = {}, options = {}) {
        return this.router.url(routeNameOrPath, routeParameters, options)
    }
}
