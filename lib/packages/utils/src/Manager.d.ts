/**
 * Error for this layer
 *
 */
export declare class ManagerError extends Error {
}
/**
 * The shape of the Adapter config
 */
export declare type AdapterConfiguration = {
    driver: string;
    options: any;
};
/**
 * The shape of the Manager config
 */
export declare type ManagerConfiguration = {
    use: string;
    adapters: {
        [key: string]: AdapterConfiguration;
    };
};
/**
 * Shape of the Driver
 */
export declare type Driver<Adapter> = {
    install(config: AdapterConfiguration): Adapter;
};
/**
 * The manager. It's nothing but managing adapters.
 */
export declare class Manager<Adapter> {
    private config;
    /**
     * List of installed adapters
     */
    protected adapters: Map<string, Adapter>;
    /**
     * List of supported drivers
     */
    protected drivers: Map<string, Driver<Adapter>>;
    /**
     *
     * @param config
     */
    constructor(config: ManagerConfiguration);
    /**
     * Register an existing adapter to the manager
     *
     * @param adapterName
     * @param adapter
     */
    register(adapterName: string, adapter: Adapter): this;
    /**
     * Get an adapter by its given name
     *
     * @param adapterName
     */
    adapter(adapterName?: string): Adapter;
    /**
     * Get the list of the supported drivers
     */
    supporteds(): IterableIterator<string>;
    /**
     * Determine if a given driver is supported
     *
     * @param driver
     */
    supports(driver: string): boolean;
    /**
     * Determine if a given adapter is installed or not.
     *
     * @param adapter
     */
    installed(adapter: string): boolean;
    /**
     * Extends this Manager with a new Driver
     *
     * @param name
     * @param driver
     */
    extends(name: string, driver: Driver<Adapter>): Manager<Adapter>;
}
