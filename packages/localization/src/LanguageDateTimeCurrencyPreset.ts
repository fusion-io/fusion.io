import { Preset } from "./Locale";

export type LDCConfiguration = {
    timezone?: string
    datetimeFormat?: string
    currency?: {
        defaultAmount?: number
        defaultCurrency: string
        defaultPrecision?: number
        globalLocale?: string
        globalFormat?: string
        globalRoundingMode?: string
        globalFormatRoundingMode?: string
        globalExchangeRatesApi?: {
            endpoint: string|Promise<any>
            propertyPath: string
            headers: any
        }
    },
    language?: string,

}

export default class LanguageDateTimeCurrencyPreset implements Preset {

    constructor(private config: LDCConfiguration) { }

    async apply(i18next: any, moment: any, Dinero: any) {
        const { timezone, datetimeFormat, currency, language } = this.config;

        if (language) {
            await i18next.changeLanguage(language);
        }

        if (timezone) {
            timezone === "local" ?
                moment.tz.setDefault() :
                moment.tz.setDefault(timezone)
            ;
        }

        if (datetimeFormat) {
            moment.defaultFormat = datetimeFormat;
        }

        if (currency) {
            Object.assign(Dinero, currency);
        }
    }
}
