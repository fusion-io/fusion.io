import { Plasma as CorePlasma } from "@fusion.io/core";
import { Plasma as Authentication } from "@fusion.io/authenticate";
import { Plasma as Authorization } from "@fusion.io/authorization";
import { Plasma as Validation } from "@fusion.io/validation";
import { Plasma as Localization } from "@fusion.io/localization";
import { Plasma as Database } from "@fusion.io/integrations-knex";
import { Plasma as Templating } from "./templating";
import { Plasma as Http } from "./http";
import { Plasma as ProtonAuthentication } from "./authentication/Plasma";

export default class Plasma extends CorePlasma {

    compose() {
        this.tokamak
            .fuse(Http)
            .fuse(Templating)
            .fuse(Validation)
            .fuse(Localization)
            .fuse(Database)
            .fuse(Authentication)
            .fuse(Authorization)
            .fuse(ProtonAuthentication)
        ;
    }
}
