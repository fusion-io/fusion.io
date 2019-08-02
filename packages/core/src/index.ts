import { Container, DependencyKey } from "@fusion.io/container";

export * from "@fusion.io/utils";

export {
    DependencyKey
}

/**
 * Shape of a Plasma type.
 *
 */
export type PlasmaConstructor = {
    new(tokamak: Tokamak, config: any): Plasma
}

/**
 * Plasma is just a simple service composer.
 *
 */
export class Plasma {

    constructor(protected tokamak: Tokamak, protected config: any) { }

    public compose(...services: any[]) { };
    public boot(...services: any[]) { };
}

/**
 * An application core.
 * It is nothing special but a "place"
 * for the plasma working around.
 *
 */
export class Tokamak extends Container {

    /**
     * Supported plasma
     *
     */
    private plasmas: Plasma[] = [];

    /**
     * Initialize the configuration
     *
     * @param config
     */
    configure(config: any) {
        this.value('config', config);

        return this;
    }

    /**
     * Fuse this Tokamak with some plasma
     *
     * @param Plasma
     */
    public fuse(Plasma: PlasmaConstructor) {
        const plasma = new Plasma(this, this.make('config'));

        plasma.compose();

        this.plasmas.push(plasma);
        return this;
    }

    /**
     * Start this Tokamak
     *
     */
    public start() {
        this.plasmas.forEach(plasma => plasma.boot());

        return this;
    }
}

/**
 * The tokamak instance
 */
export const tokamak = new Tokamak();

/**
 * Bind a Symbol to the tokamak
 */
export const bind = (...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    tokamak.autoBind(Target);
};

/**
 * Bind a Symbol to the tokamak as a singleton
 */
export const singleton = (...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    tokamak.autoSingleton(Target);
};

/**
 * Bind a Symbol to the tokamak as an Concrete of given Abstract
 */
export const bindInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    tokamak.bindInversion(AbstractSymbol, Target);
};

/**
 * Bind a Symbol to the tokamak as an Concrete of given Abstract as a singleton
 */
export const singletonInversion = (AbstractSymbol: any, ...dependencies: any[]) => (Target: any) => {
    Target.dependencies = dependencies;
    tokamak.singletonInversion(AbstractSymbol, Target);
};

/**
 * Method decorator for injecting dependencies in to a class method
 */
export const inject = (...dependencies: any[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const deps = dependencies.map((d: DependencyKey) => tokamak.make(d));

        return originValue.apply(this, [...args, ...deps]);
    }
};
