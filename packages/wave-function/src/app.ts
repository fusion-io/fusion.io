import { tokamak, ProtonPlasma, Kernel } from "@fusion.io/proton";
import Gateways from "./auth/Plasma"
import HttpPlasma from "./http/Plasma";

const config = require("../config");

tokamak
    .configure(config)
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
    .fuse(Gateways)
    .start()
;

tokamak.make<Kernel>(Kernel).listen(process.env.PORT || 2512);
