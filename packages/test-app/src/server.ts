import {container} from "@fusion.io/core";
import {plasma as http, Router, Kernel} from "@fusion.io/http";
import {plasma as app} from "./app";
import {Tokamak} from "@fusion.io/core";

const application = new Tokamak({});

application
    .fuse(http)
    .fuse(app)
    .start()
;

const server = container.make<Kernel>(Kernel);
const router = container.make<Router>(Router);

server.use(router.routes());
server.listen(3000);
