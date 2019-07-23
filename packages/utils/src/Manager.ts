/**
 * Shape of the Driver
 */
export type Driver<Adapter> = {
    install () : Adapter
}

/**
 * The manager. It's nothing but managing adapters.
 */
export default class Manager<Adapter> {

    /**
     * List of installed adapters
     */
    private installed: Map<string, Adapter> = new Map();

    /**
     * List of supported drivers
     */
    private drivers: Map<string, Driver<Adapter>> = new Map();

    /**
     * Register an existing adapter to the manager
     *
     * @param adapterName
     * @param adapter
     */
    public register(adapterName: string, adapter: Adapter) {

        this.installed.set(adapterName, adapter);

        return this;
    }

    /**
     * Get an adapter by its given name
     *
     * @param adapterName
     */
    public adapter(adapterName: string): Adapter {

        const adapter = this.installed.get(adapterName);

        if (!adapter) {
            throw new Error(`Adapter [${adapterName}] is not supported`);
        }

        return adapter;
    }

    /**
     * Extends this Manager with a new Driver
     *
     * @param name
     * @param driver
     */
    public extends(name: string, driver: Driver<Adapter>): Manager<Adapter> {
        this.drivers.set(name, driver);
        return this;
    }
}
