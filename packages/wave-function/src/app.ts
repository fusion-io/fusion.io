import { tokamak, ProtonPlasma, Kernel, Router } from "@fusion.io/proton";
import HttpPlasma from "./http/Plasma";
import config from "./config";

tokamak
    .configure(config)
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
    .start()
;

tokamak.make<Kernel>(Kernel).listen(process.env.PORT || 2512);
