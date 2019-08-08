import { tokamak, ProtonPlasma } from "@fusion.io/proton";
import HttpPlasma from "./http/Plasma";

export default tokamak
    .configure(require("../config"))
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
;
