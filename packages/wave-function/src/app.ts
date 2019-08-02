import { tokamak, ProtonPlasma, Kernel, Router } from "@fusion.io/proton";
import { Plasma as Authentication } from "@fusion.io/authenticate";
import Gateways from "./auth/Plasma"
import HttpPlasma from "./http/Plasma";
import config from "./config";

tokamak
    .configure(config)
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
    .fuse(Authentication)
    .fuse(Gateways)
    .start()
;

tokamak.make<Kernel>(Kernel).listen(process.env.PORT || 2512);
