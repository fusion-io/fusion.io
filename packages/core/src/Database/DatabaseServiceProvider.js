import ServiceProvider from "../utils/ServiceProvider";
import {Config, Database} from "../Contracts";
import DatabaseManager from "./DatabaseManager";

export default class DatabaseServiceProvider extends ServiceProvider {

    register() {
        this.container.singleton(Database, container => {
            const config = container.make(Config);

            return new DatabaseManager(config.get('database'));
        });
    }

}
