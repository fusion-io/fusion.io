import {container} from "@fusion.io/core";
import {plasma as http, Router} from "@fusion.io/http";
import {plasma as app} from "./app";
import {Tokamak} from "@fusion.io/core";
import Koa from "koa";

const application = new Tokamak({});

application
    .fuse(http)
    .fuse(app)
    .start()
;

const server = new Koa();

const router = container.make<Router>(Router);

server.use(router.routes());
server.listen(3000);
