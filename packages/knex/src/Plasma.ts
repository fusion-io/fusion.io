import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { ConsoleKernel } from "@fusion.io/commands";
import DatabaseManager from "./DatabaseManager";
import Migration from "./commands/migration/Migration";
import Connections from "./commands/connections/Connections";
import Seeder from "./commands/seeder/Seeder";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel)
    compose(console: ConsoleKernel) {
        console
            .register(Migration)
            .register(Connections)
            .register(Seeder)
        ;
    }

    @inject(DatabaseManager)
    boot(dbm: DatabaseManager) {
        const { database } = this.config;

        dbm.bootstrap(database);
    }
}
