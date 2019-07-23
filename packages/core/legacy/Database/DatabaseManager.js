import Manager from "../utils/Manager";
import KnexDriver from "./KnexDriver";

export default class DatabaseManager extends Manager {

    constructor({defaultConnection, connections}) {
        super();

        this.defaultConnection  = defaultConnection;
        this.drivers['knex']    = new KnexDriver(connections);
    }

    connection(connectionName = null) {
        return this.adapter(connectionName);
    }

    getDefaultAdapterName() {
        return this.defaultConnection;
    }

    resolveDriver(connectionName) {
        return 'knex';
    }
}
