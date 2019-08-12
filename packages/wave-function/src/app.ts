import { tokamak, ProtonPlasma } from "@fusion.io/proton";
import { Plasma as KnexPlasma } from "@fusion.io/integrations-knex";
import HttpPlasma from "./http/Plasma";
import AuthPlasma from "./auth/Plasma";

export default tokamak
    .configure(require("../config"))
    .fuse(ProtonPlasma)
    .fuse(HttpPlasma)
    .fuse(AuthPlasma)
    .fuse(KnexPlasma)
;
