import { Manager, singleton } from "@fusion.io/core";
import knex, { ConnectionConfig } from "knex";

export type DatabaseManagerConfig = {
    default: string,
    connections: {
        [name:string]: ConnectionConfig|any
    }
}

@singleton()
export default class DatabaseManager extends Manager<knex> {

    /**
     *
     * @param config
     */
    bootstrap(config: DatabaseManagerConfig) {
        return this.configure({
            default  : config.default,
            adapters : config.connections
        })
    }

    /**
     *
     * @param connection
     */
    connection(connection?: string) {
        return this.adapter(connection);
    }

    /**
     * Install an adapter via its driver and configuration
     *
     * @param options
     */
    public installAdapter(options: any): knex {
        return knex(options);
    }
}
