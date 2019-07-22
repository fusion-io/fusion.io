import lodash from "lodash";

/**
 * A simple adapter manager
 */
export default class Manager {

    constructor() {
        this.adapters = { };
        this.drivers  = { };
    }

    /**
     * Get an adapter by its given name.
     *
     * @param adapterName if it is null, then we'll get the defaultAdapter
     * @return {*}
     */
    adapter(adapterName = null) {

        adapterName = adapterName || this.getDefaultAdapterName();

        return this.createIfNotCreatedAdapter(adapterName);
    }

    /**
     * Check if an adapter is created.
     *
     * @param adapterName
     * @return {boolean}
     */
    created(adapterName) {
        return !!this.adapters[adapterName];
    }

    /**
     * Create an adapter if it is not created before.
     *
     * @param adapterName
     * @return {*}
     */
    createIfNotCreatedAdapter(adapterName) {

        if (this.created(adapterName)) {
            return this.adapters[adapterName];
        }

        const driverName = this.resolveDriver(adapterName);

        if (!this.supported(driverName)) {
            throw new Error(`E_MANAGER: The driver [${driverName}] is not supported`);
        }

        this.adapters[adapterName] = this.drivers[driverName].install(adapterName, this);

        return this.adapters[adapterName];
    }

    /**
     * Check if the manager supports the given driver.
     *
     * @param driverName
     * @return {boolean}
     */
    supported(driverName) {
        return !!this.drivers[driverName];
    }

    /**
     * Get the list of supporting drivers.
     *
     * @return string[]
     */
    supports() {
        return lodash.keys(this.drivers);
    }

    /**
     * Register a driver to the manager. So it will be supported
     *
     * @param {string} driverName
     * @param {{install: function}} driver
     * @return {Manager}
     */
    registerDriver(driverName, driver) {
        this.drivers[driverName] = driver;

        return this;
    }

    /**
     * Get the driverName from a given adapterName
     *
     * @abstract
     * @param adapterName
     * @return {string}
     */
    resolveDriver(adapterName) {
        // Abstract method
    }

    /**
     * Get the default adapter name
     *
     * @abstract
     * @return {string}
     */
    getDefaultAdapterName() {
        // Abstract method
    }
}
