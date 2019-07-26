import { container } from "@fusion.io/container";

/**
 * Plasma is just a simple service composer.
 *
 */
export declare type Plasma = {

    /**
     * Composes the app
     *
     * @param app
     */
    compose(app: Tokamak): void,

    /**
     * Bootstrap the application after the service
     * has been composed
     *
     */
    boot?(): void
}

/**
 * An application core.
 * It is nothing special but a "place"
 * for the plasma working around.
 *
 */
export default class Tokamak {

    /**
     * Supported plasma
     *
     */
    private plasmas:Plasma[] = [];

    /**
     *
     * @param configuration
     */
    constructor(configuration: any) {
        container.value('config', configuration);
    }

    /**
     * Fuse this Tokamak with some plasma
     *
     * @param plasma
     */
    fuse(plasma: Plasma) {
        this.plasmas.push(plasma);

        plasma.compose(this);

        return this;
    }

    /**
     * Start this Tokamak
     *
     */
    start() {
        this.plasmas.forEach(plasma => plasma.boot && plasma.boot());

        return this;
    }
};
