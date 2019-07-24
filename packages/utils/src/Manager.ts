/**
 * Error for this layer
 *
 */
export class ManagerError extends Error { }

/**
 * The shape of the Adapter config
 */
export type AdapterConfiguration = {
    driver: string,
    options: any
}

/**
 * The shape of the Manager config
 */
export type ManagerConfiguration = {
    use: string,
    adapters: {
        [key: string]: AdapterConfiguration
    }
}

/**
 * Shape of the Driver
 */
export type Driver<Adapter> = {
    install (config: AdapterConfiguration) : Adapter
}

/**
 * The manager. It's nothing but managing adapters.
 */
export class Manager<Adapter> {

    /**
     * List of installed adapters
     */
    protected adapters: Map<string, Adapter> = new Map();

    /**
     * List of supported drivers
     */
    protected drivers: Map<string, Driver<Adapter>> = new Map();

    /**
     *
     * @param config
     */
    constructor(private config: ManagerConfiguration) {

    }

    /**
     * Register an existing adapter to the manager
     *
     * @param adapterName
     * @param adapter
     */
    public register(adapterName: string, adapter: Adapter) {

        this.adapters.set(adapterName, adapter);

        return this;
    }

    /**
     * Get an adapter by its given name
     *
     * @param adapterName
     */
    public adapter(adapterName?: string): Adapter {

        if (!adapterName) {
            adapterName = this.config.use;
        }

        let adapter = this.adapters.get(adapterName);

        if (adapter) {
            return adapter;
        }

        const adapterConfig = this.config.adapters[adapterName];

        if (!adapterConfig) {
            throw new ManagerError(`There are no configuration for adapter [${adapterName}]`);
        }

        const driver = this.drivers.get(adapterConfig.driver);

        if (!driver) {
            throw new ManagerError(`Driver [${adapterConfig.driver}] is not supported`);
        }

        adapter = driver.install(adapterConfig);

        this.adapters.set(adapterName, adapter);

        return adapter;
    }

    /**
     * Get the list of the supported drivers
     */
    public supporteds() {
        return this.drivers.keys();
    }

    /**
     * Determine if a given driver is supported
     *
     * @param driver
     */
    public supports(driver: string) {
        return this.drivers.has(driver);
    }

    /**
     * Determine if a given adapter is installed or not.
     *
     * @param adapter
     */
    public installed(adapter: string) {
        return this.adapters.has(adapter);
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
