import { tokamak } from "@fusion.io/core";
import Router from "../http/Router";

/**
 * Adding service related globals
 *
 * @param view
 */
export default (view: any) => {

    const router = tokamak.make<Router>(Router);

    // Reverse Routing URL helper function
    view.addGlobal('url', Router.url);

    // Generate url based on route name
    view.addGlobal('route', router.url);
};
