import {container} from "@fusion.io/core";
import {Kernel, Router} from "@fusion.io/http";
import fusion from "./fuse";

const server = container.make<Kernel>(Kernel);
const router = container.make<Router>(Router);

fusion.start();

server.use(router.routes());
server.listen(3000);
