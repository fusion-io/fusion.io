import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { ConsoleKernel } from "@fusion.io/commands";
import DatabaseManager from "./DatabaseManager";
import Migration from "./commands/migration/Migration";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel)
    compose(console: ConsoleKernel) {
        console.register(Migration)
    }

    @inject(DatabaseManager)
    boot(dbm: DatabaseManager) {
        const { database } = this.config;

        dbm.bootstrap(database);
    }
}
