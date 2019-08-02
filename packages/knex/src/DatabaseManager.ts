import { Manager, singleton } from "@fusion.io/core";
import knex from "knex";

@singleton()
export default class DatabaseManager extends Manager<knex> {

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
