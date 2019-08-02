import { tokamak, ProtonPlasma, Kernel, Router } from "@fusion.io/proton";
import config from "./config";
import HelloController from "./HelloController";

const kernel = tokamak.make<Kernel>(Kernel);
const router = tokamak.make<Router>(Router);

tokamak
    .configure(config)
    .fuse(ProtonPlasma)
    .start()
;

router.controller(HelloController);

kernel.listen(process.env.PORT || 2512);