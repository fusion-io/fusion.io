import Table                  from "cli-table3";
import chalk                  from "chalk";
import {Database} from "../../../Contracts";
import MigrationStateProvider from "../../../Migration/MigrationStateProvider";
import MigrationsProvider from "../../../Migration/MigrationsProvider";

export const command = "list";
export const desc    = "Listing the migrations";
export const builder = yargs => {
    yargs.option("c", {
        alias: "connection",
        desc: "Specify the database connection",
        type: "string",
        default: null
    });
};

const print = (set) => {
    let table = new Table({
        head: ['', chalk.cyan('name'), chalk.cyan('run at')],
        colWidths: [3, 40, 30]
    });

    set.defines().forEach(({name}) => {

        const execution  = set.getExecution(name);
        const statusIcon = execution ? chalk.green('√') : '';


        table.push([
            statusIcon,
            execution ? chalk.gray(name) : name,
            execution ? chalk.gray(new Date(parseInt(execution.runAt)).toISOString()): ''
        ]);
    });

    return table;
};

export const handler  = async ({container, connection, rc}) => {

    const dbm  = container.make(Database);
    const dbc  = dbm.connection(connection);

    const stateProvider     = new MigrationStateProvider(dbc).setTable(rc.migrations.table);
    const migrationProvider = new MigrationsProvider(process.cwd() + '/' + rc.migrations.directory);

    const set = await migrationProvider.load();

    set.setState(await stateProvider.get());

    console.log(print(set).toString());

    process.exit(0);
};


