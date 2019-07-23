import knex from "knex";

export default class KnexDriver {

    constructor(config) {
        this.config = config;
    }

    install(connectionName) {
        const connectionConfig = this.config[connectionName];

        if (!connectionConfig) throw new Error(`E_DATABASE: Connection ${connectionName} is not configured`);

        return knex(connectionConfig);
    }
}
