import { tokamak, ProtonPlasma, Kernel } from "@fusion.io/proton";
import HttpPlasma from "./http/Plasma";

export const protonKernel = tokamak.make(Kernel);

export default tokamak
    .configure(require("../config"))
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
;