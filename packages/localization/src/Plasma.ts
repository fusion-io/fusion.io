import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import { Locale } from "./Locale";
import LanguageDateTimeCurrencyPreset from "./LanguageDateTimeCurrencyPreset";

export default class Plasma extends CorePlasma {

    @inject(Locale)
    compose(localization: Locale) {

        const { locale } = this.config;

        localization.supporting('ldc', opts => new LanguageDateTimeCurrencyPreset(opts));
        localization.configure(locale);
    }
}
