export class ManagerError extends Error { }

/**
 * The shape of the Adapter configuration
 */
export type AdapterConfiguration = {
    driver: string,
    options?: any
}

/**
 * The shape of the Manger configuration
 */
export type ManagerConfiguration = {
    default: string,
    adapters: {
        [index: string]: AdapterConfiguration
    }
}

/**
 * Driver is just a factory function,
 * that can create an adapter with given options
 */
export type Driver<Adapter> = (options: any) => Adapter

/**
 * Manager is a service which can manages the adapters and its supported drivers.
 */
export class Manager<Adapter> {

    /**
     * List of the supported drivers
     */
    protected supports: Map<string, Driver<Adapter>> = new Map<string, Driver<Adapter>>();

    /**
     * List of the installed adapters
     */
    protected adapters: Map<string, Adapter> = new Map<string, Adapter>();

    /**
     * The default configuration of the manager
     */
    private config: ManagerConfiguration = {
        default: "",
        adapters: { }
    };

    /**
     * Initialize the Manager with a given configuration
     *
     * @param config
     */
    public configure(config: ManagerConfiguration) {
        this.config = config;
        return this;
    }

    /**
     * Adding a driver into the list of
     * supported drivers.
     *
     * @param name
     * @param driver
     */
    public supporting(name: string, driver: Driver<Adapter>) {
        this.supports.set(name, driver);
        return this;
    }

    /**
     * Determine if the given driver is supported
     * or not.
     *
     * @param driver
     */
    public supported(driver: string) {
        return this.supports.has(driver);
    }

    /**
     *
     * @param adapter
     */
    public adapter(adapter?: string): Adapter {
        adapter = adapter || this.config.default;

        if (this.adapters.has(adapter)) {
            return (this.adapters.get(adapter) as Adapter);
        }

        if (!this.config.adapters.hasOwnProperty(adapter)) {
            throw new ManagerError(`Adapter [${adapter}] is not configured`);
        }

        const installed = this.installAdapter(this.config.adapters[adapter]);

        this.adapters.set(adapter, installed);

        return installed;
    }

    /**
     * Install an adapter via its driver and configuration
     *
     * @param driver
     * @param options
     */
    protected installAdapter({driver, options} : AdapterConfiguration): Adapter {

        if (!this.supported(driver)) {
            throw new ManagerError(`Driver [${driver}] is not supported`);
        }

        const driverInstance: Driver<Adapter> = (this.supports.get(driver) as Driver<Adapter>);

        return driverInstance(options);
    }

    /**
     * Extend this Manager with a given Adapter.
     * Sometimes we already have the prebuilt adapter instance,
     * We can also extends the Manager with such adapter.
     *
     * @param name
     * @param adapter
     */
    public extends(name: string, adapter: Adapter) {
        this.adapters.set(name, adapter);
        return this;
    }

    /**
     * Get the installed adapter
     */
    public installed() {
        return this.adapters;
    }
}
