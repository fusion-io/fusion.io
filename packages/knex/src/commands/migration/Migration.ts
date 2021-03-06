import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import chalk from "chalk";
import Up from "./Up";
import Create from "./Create";
import Init from "./Init";
import Down from "./Down";
import DatabaseMigrator from "../../migration/DatabaseMigrator";
import DatabaseManager from "../../DatabaseManager";
import DatabaseMigrationState from "../../migration/DatabaseMigrationState";

@singleton()
export default class Migration extends Command {

    describe = 'List the migrations';

    subCommands = [ Create, Up, Down, Init ];

    options = {

        connection: {
            describe: 'Specify the database connection',
            alias: 'c',
            type: 'string',
            default: null
        },

        force: {
            describe: 'Force run the migration',
            alias: 'f',
            type: 'boolean',
            default: false
        }
    };

    middlewares = [
        (argv: any) => this.checkForEnvironment(argv),
        // @ts-ignore
        (argv: any) => this.switchConnection(argv)
    ];

    async checkForEnvironment(argv: any) {
        if ('production' === process.env.NODE_ENV && (!argv.force)) {
            await this.output.error('box', 'You are about running a migration command in production environment.' +
                ' This action might cause data loss.\nIf you understand the risks and wish to continue,' +
                ' re-run the command with the --force flag.');

            await this.output.info('log', 'Exiting command with error code 20');

            process.exit(20);
        }
    }

    @inject(DatabaseMigrator, DatabaseManager)
    switchConnection({ connection }: any, migrator: DatabaseMigrator, dbm: DatabaseManager) {
        (migrator.state as DatabaseMigrationState).setConnection(dbm.connection(connection));
    }

    @inject(DatabaseMigrator)
    protected async execute(argv: any, migrator: DatabaseMigrator) {
        await this.output.operate('table', { head: ['', '#', 'migration' ]}, async (table: any) => {

            const migrations = await migrator.state.list();

            migrations.forEach((migration, index) =>
                table.push(['✅', chalk.cyan((index + 1).toString()), chalk.cyan(migration)])
            );

            const left = await migrator.manager.diff(migrations);

            left.forEach((migration, index) =>
                table.push(['⬜', chalk.gray((index + migrations.length + 1).toString()), chalk.gray(migration)])
            );
        }) ;
    }
}
