import {Manager, singleton, AdapterConfiguration} from "@fusion.io/core";
import knex from "knex";

@singleton()
export default class DatabaseManager extends Manager<knex> {

    /**
     *
     * @param connection
     */
    connection(connection?: string) {
        this.adapter(connection);
    }

    /**
     * Install an adapter via its driver and configuration
     *
     * @param driver
     * @param options
     */
    public installAdapter({driver, options} : AdapterConfiguration): knex {
        return knex(options);
    }
}
