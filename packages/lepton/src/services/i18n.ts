import {container} from "@fusion.io/core";
import i18next from "i18next";

// @ts-ignore | Heeeee! No @types for this library :(
import SyncBackend from "i18next-sync-fs-backend";

import {Config, I18N} from "../serviceLocator";

export const plasma = {

    compose: () => {

        const { i18n } = container.make(Config);

        container.value(I18N, i18next.use(SyncBackend).init({...i18n, initImmediate: false}));
    }
};
