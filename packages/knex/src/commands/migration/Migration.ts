import { Command } from "@fusion.io/commands";
import {inject, singleton} from "@fusion.io/core";
import chalk from "chalk";
import Up from "./Up";
import Create from "./Create";
import Init from "./Init";
import Down from "./Down";
import DatabaseMigrator from "../../migration/DatabaseMigrator";

@singleton()
export default class Migration extends Command {

    describe = 'Listing the migrations';

    subCommands = [ Create, Up, Down, Init ];

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
