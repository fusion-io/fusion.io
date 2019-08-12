import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import DatabaseMigrator from "../../migration/DatabaseMigrator";
import chalk from "chalk";

@singleton()
export default class Init extends Command {

    describe = 'Initialize the database migration table.';

    @inject(DatabaseMigrator, 'config')
    protected async execute(argv: any, migrator: DatabaseMigrator) {
        await migrator.state.prepare();
        this.output.info(
            'log',
            `Initialized migration table [${chalk.yellow((migrator.state as any).table)}]`
        );
    }
}
