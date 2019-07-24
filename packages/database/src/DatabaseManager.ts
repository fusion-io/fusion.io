import Knex, {QueryInterface, ConnectionConfig} from "knex";
import {singleton, Manager, ManagerConfiguration, AdapterConfiguration} from "@fusion.io/core";

/**
 * The shape of the database configuration.
 */
export declare type DatabaseConfig = {
    use: string
    connections: {
        [key: string]: ConnectionConfig
    }
}

/**
 * Driver that wraps knex.
 * Since the knex supports multiple driver by itself.
 * So the DatabaseManager don't need to have many drivers.
 * Just one 'knex' driver is enough.
 *
 */
export class KnexWrappedDriver {

    /**
     * Install a knex connection into the manager
     * as an adapter
     *
     * @param config
     */
    install(config: AdapterConfiguration): QueryInterface {
        return Knex(config.options);
    }
}

@singleton('config')
export default class DatabaseManager extends Manager<QueryInterface> {

    /**
     * Wrap and converts the database configuration to manager-like configuration.
     *
     * @param database
     */
    constructor({database}: {database: DatabaseConfig}) {

        const connectionConfig = database.connections;
        const managerConfig: ManagerConfiguration = { use: database.use, adapters: { } };

        for (let key in connectionConfig) {
            managerConfig.adapters[key] = {
                options: connectionConfig[key],
                driver: 'knex'
            }
        }

        super(managerConfig);
        super.extends('knex', new KnexWrappedDriver());
    }

    /**
     *
     * @param connection
     */
    connection(connection?: string): QueryInterface {
        return super.adapter(connection);
    }
}
