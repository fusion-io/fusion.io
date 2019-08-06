import { tokamak, ProtonPlasma } from "@fusion.io/proton";
import Gateways from "./auth/Plasma"
import HttpPlasma from "./http/Plasma";

const config = require("../config");

export default tokamak
    .configure(config)
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
    .fuse(Gateways)
;
