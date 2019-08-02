import { singleton, Manager } from "@fusion.io/core";

export type Preset = {
    apply(...args: any[]): Promise<void>
}

@singleton()
export class Locale extends Manager<Preset> {

    switch(locale: string, ...concerns: any[]) {
        return this.adapter(locale).apply(...concerns)
    }
}
