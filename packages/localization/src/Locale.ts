import { singleton, Manager } from "@fusion.io/core";

export type Preset = {
    apply(...args: any[]): Promise<void>
}

export type LocaleConfiguration = {
    default: string,
    presets: {
        [name: string]: {
            preset: string,
            options: any
        }
    }
}

@singleton()
export class Locale extends Manager<Preset> {

    bootstrap(config: LocaleConfiguration) {
        const standardConfig = Object.entries(config.presets).reduce((merged, [name, { preset, options }]) => ({
            ...merged,
            [name]: {
                driver: preset,
                options
            }
        }), {});

        return this.configure({
            default: config.default,
            adapters: standardConfig
        });
    }

    switch(locale: string, ...concerns: any[]) {
        return this.adapter(locale).apply(...concerns)
    }
}
