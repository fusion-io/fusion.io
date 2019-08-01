import { QueryInterface, ConnectionConfig } from "knex";
import { Manager, AdapterConfiguration } from "@fusion.io/core";
/**
 * The shape of the database configuration.
 */
export declare type DatabaseConfig = {
    use: string;
    connections: {
        [key: string]: ConnectionConfig;
    };
};
/**
 * Driver that wraps knex.
 * Since the knex supports multiple driver by itself.
 * So the DatabaseManager don't need to have many drivers.
 * Just one 'knex' driver is enough.
 *
 */
export declare class KnexWrappedDriver {
    /**
     * Install a knex connection into the manager
     * as an adapter
     *
     * @param config
     */
    install(config: AdapterConfiguration): QueryInterface;
}
export default class DatabaseManager extends Manager<QueryInterface> {
    /**
     * Wrap and converts the database configuration to manager-like configuration.
     *
     * @param database
     */
    constructor({ database }: {
        database: DatabaseConfig;
    });
    /**
     *
     * @param connection
     */
    connection(connection?: string): QueryInterface;
}
