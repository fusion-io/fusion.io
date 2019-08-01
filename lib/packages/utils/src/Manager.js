"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error for this layer
 *
 */
class ManagerError extends Error {
}
exports.ManagerError = ManagerError;
/**
 * The manager. It's nothing but managing adapters.
 */
class Manager {
    /**
     *
     * @param config
     */
    constructor(config) {
        this.config = config;
        /**
         * List of installed adapters
         */
        this.adapters = new Map();
        /**
         * List of supported drivers
         */
        this.drivers = new Map();
    }
    /**
     * Register an existing adapter to the manager
     *
     * @param adapterName
     * @param adapter
     */
    register(adapterName, adapter) {
        this.adapters.set(adapterName, adapter);
        return this;
    }
    /**
     * Get an adapter by its given name
     *
     * @param adapterName
     */
    adapter(adapterName) {
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
    supporteds() {
        return this.drivers.keys();
    }
    /**
     * Determine if a given driver is supported
     *
     * @param driver
     */
    supports(driver) {
        return this.drivers.has(driver);
    }
    /**
     * Determine if a given adapter is installed or not.
     *
     * @param adapter
     */
    installed(adapter) {
        return this.adapters.has(adapter);
    }
    /**
     * Extends this Manager with a new Driver
     *
     * @param name
     * @param driver
     */
    extends(name, driver) {
        this.drivers.set(name, driver);
        return this;
    }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map