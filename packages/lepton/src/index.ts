// Native supported services

import {container, Tokamak} from "@fusion.io/core";
import {plasma as http, Kernel} from "@fusion.io/http";
import {plasma as validation} from "@fusion.io/validation";
import {plasma as authentication} from "@fusion.io/authenticate";
import {plasma as logging} from "./services/logger";
import {plasma as translation} from "./services/i18n";
import {plasma as templating, renderable} from "./services/templating";


// Service dependencies
export * from "@fusion.io/core";
export * from "@fusion.io/http"
export * from "@fusion.io/validation";
export * from "@fusion.io/authenticate";

// Plasma for this framework
export const plasma = {

    compose: (tokamak: Tokamak) => {
        tokamak
            .fuse(http)
            .fuse(validation)
            .fuse(authentication)
            .fuse(logging)
            .fuse(translation)
            .fuse(templating)
        ;
    },

    boot: () => {

        const kernel    = container.make<Kernel>(Kernel);
        const { http }  = container.make('config');

        kernel.on('error',(error) => {
            console.error(error);
        });
        kernel.keys = http.keys;
    }
};

export {
    renderable
}