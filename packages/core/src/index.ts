export * from "@fusion.io/container";
export * from "@fusion.io/authenticate/lib/core";
export * from "@fusion.io/http";

export type Bootstrapper = {
    initial     : Function,
    bootstrap   : Function
};

export class Application {

    constructor(private config: any = {}) { }

    bootstrap(providers: Bootstrapper[]) {
        providers.forEach(bootstrapper => bootstrapper.initial(this.config));
        providers.forEach(bootstrapper => bootstrapper.bootstrap(this.config));

        return this;
    }
}
