import {Router} from "@fusion.io/http";
import HelloController from "./controllers/HelloController";
import {DatabaseManager} from "@fusion.io/database";

export const plasma = {
    dependencies: [Router, DatabaseManager],
    bootstrapper: (router: Router) => {
        router.controller(HelloController);
    }
};
