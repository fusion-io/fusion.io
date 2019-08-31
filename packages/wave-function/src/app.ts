import { tokamak, ProtonPlasma } from "@fusion.io/proton";
import { Plasma as KnexPlasma } from "@fusion.io/integrations-knex";
import { Plasma as BusPlasma } from "@fusion.io/bus";
import { Plasma as NeutronPlasma } from "@fusion.io/neutron";
import { Plasma as ViewPlasma } from "@fusion.io/integrations-handlebars";

import HttpPlasma from "./http/Plasma";
import AuthPlasma from "./auth/Plasma";

export default tokamak
    .configure(require("../config"))
    .fuse(ProtonPlasma)
    .fuse(BusPlasma)
    .fuse(HttpPlasma)
    .fuse(AuthPlasma)
    .fuse(KnexPlasma)
    .fuse(NeutronPlasma)
    .fuse(ViewPlasma)
;
