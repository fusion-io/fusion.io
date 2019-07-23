import {container, DependencyKey} from "@fusion.io/container";

declare type Plasma = {
    dependencies: DependencyKey[]
    bootstrapper(...dependencies: any[]): void
}

export default class Tokamak {

    private plasmas:Plasma[] = [];

    constructor(configuration: any) {
        container.value('config', configuration);
    }

    fuse(plasma: Plasma) {
        this.plasmas.push(plasma);

        return this;
    }

    start() {
        this.plasmas.forEach(plasma => {
            const resolved = plasma.dependencies.map(dependency => container.make(dependency));
            plasma.bootstrapper(...resolved);
        });
    }
};
