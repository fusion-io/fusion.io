import Container from "./Container";

export declare type AdapterFactory = (...args: any[]) => any;

export class ManagerError extends Error { }

/**
 * A container based Manager.
 * It will store adapters in a container.
 *
 */
export default class Manager<Adapter> {

    /**
     *
     */
    private defaultAdapterName?: string;

    /**
     *
     * @param container
     * @param namespace
     */
    constructor(private container: Container, private namespace: string) { }

    /**
     *
     * @param name
     * @param adapterFactory
     */
    public register(name: string, adapterFactory: AdapterFactory) {

        const adapterKey = `${this.namespace}.${name}`;

        if (this.container.bound(adapterKey)) {
            throw new ManagerError(`Could not register adapter [${name}]. ` +
            `Container already registered a service with named [${adapterKey}]`);
        }

        this.container.singleton(adapterKey, adapterFactory);

        return this;
    }

    /**
     *
     * @param defaultAdapterName
     */
    public setDefaultAdapter(defaultAdapterName: string) {
        this.defaultAdapterName = defaultAdapterName;
        return this;
    }

    /**
     *
     * @param name
     */
    public adapter(name?: string): Adapter {

        if (name) {
            return this.container.make<Adapter>(`${this.namespace}.${name}`);
        }

        if (!this.defaultAdapterName) {
            throw new ManagerError("This manager does not have default adapter. Try to call .adapter(name) instead");
        }

        return this.container.make<Adapter>(`${this.namespace}.${this.defaultAdapterName}`);
    }
}
