import {Application} from "@fusion.io/core";
import modules from "./modules";
import Koa from "koa";
import {router} from "@fusion.io/http";


const application = new Application();
const server = new Koa();


application.bootstrap(modules);
server.use(router.routes());
server.listen(3000);
