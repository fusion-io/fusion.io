import {singleton} from "@fusion.io/container";
import {Url} from "../Contracts";

@singleton(Url)
export default class ContextRedirect {

    constructor(urlManger) {
        this.urlManager = urlManger;
    }

    async handle(context, next) {
        context.redirectToRoute = (urlOrRouteName, parameters = {}, query = {}, options = {}) => {
            context.redirect(this.urlManager.url(urlOrRouteName, parameters, {query}), options);
            return context;
        };

        await next();
    }
}
