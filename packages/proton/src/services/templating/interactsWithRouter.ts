import {Environment} from "nunjucks";
import {container} from "@fusion.io/core";
import {Router} from "@fusion.io/http";

/**
 * Adding service related globals
 *
 * @param view
 */
export default (view: Environment) => {

    const router = container.make<Router>(Router);

    // Reverse Routing URL helper function
    view.addGlobal('url', Router.url);

    // Generate url based on route name
    view.addGlobal('route', router.url);
};
