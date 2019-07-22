import { ServiceProvider } from "@fusion.io/framework";
import { Database } from "@fusion.io/framework/Contracts";
import { Model } from "objection";

export default class ObjectionServiceProvider extends ServiceProvider {

    register() {

    }

    boot() {
        const dbm = this.container.make(Database);
        Model.knex(dbm.connection());
    }
}
