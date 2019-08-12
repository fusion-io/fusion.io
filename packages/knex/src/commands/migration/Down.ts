import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import DatabaseMigrator from "../../migration/DatabaseMigrator";

@singleton()
export default class Down extends Command {

    describe = 'Run migration down';

    options = {

        step: {
            describe: 'Number of step',
            alias: 's',
            type: 'number',
            default: 1
        },

        reset: {
            describe: 'Reset the database',
            alias: 'r',
            type: 'boolean',
            default: false
        }
    };

    @inject(DatabaseMigrator)
    protected async execute({ step, reset }: any, migrator: DatabaseMigrator) {
        const rolledBack = reset ? await migrator.reset() : await migrator.down(step);

        rolledBack.length ?
            await this.output.info('log', rolledBack.join('\n')) :
            await this.output.info('log', 'Nothing to rollback')
        ;
    }
}
