import {Router} from "@fusion.io/http";
import HelloController from "./controllers/HelloController";

export const plasma = {
    dependencies: [Router],
    bootstrapper: (router: Router) => {
        router.controller(HelloController);
    }
};
