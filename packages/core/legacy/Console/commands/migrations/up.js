import chalk                  from "chalk";
import {Database} from "../../../Contracts";
import MigrationStateProvider from "../../../Migration/MigrationStateProvider";
import MigrationsProvider from "../../../Migration/MigrationsProvider";

export const command = "up";
export const desc    = "Run migrations";
export const builder = yargs => {
    yargs.option("t", {
        alias: "to",
        desc: "Migrate to given version name",
        type: "string"
    });

    yargs.option("n", {
        alias: "number",
        desc: "Migrate up a number of versions",
        type: "number"
    });

    yargs.option("f", {
        alias: "force",
        desc: "Force run the migrations"
    });

    yargs.option("c", {
        alias: "connection",
        desc: "Specify the database connection",
        type: "string"
    });
};

export const handler  = async ({container, connection, rc, number, to}) => {
    const dbm  = container.make(Database);
    const dbc  = dbm.connection(connection);

    const stateProvider     = new MigrationStateProvider(dbc).setTable(rc.migrations.table);
    const migrationProvider = new MigrationsProvider(process.cwd() + '/' + rc.migrations.directory);
    const set               = await migrationProvider.load();

    set.setState(await stateProvider.get());
    set.migrated(migration => {
        console.log(chalk.cyan(migration));
    });

    const notMigrated       = set.notMigrated();

    if (!notMigrated.length) {
        console.log(chalk.gray('Nothing to migrate'));
        process.exit(0);
    }

    if (number) {
        await set.up(number, dbc, stateProvider);
    } else if (to) {
        await set.upTo(to, dbc, stateProvider);
    } else {
        await set.latest(dbc, stateProvider);
    }

    process.exit(0);
};
