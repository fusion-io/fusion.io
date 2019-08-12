import { Command } from "@fusion.io/commands";
import {inject, singleton} from "@fusion.io/core";
import DatabaseMigrator from "../../migration/DatabaseMigrator";

@singleton()
export default class Up extends Command {

    options = {
        step: {
            describe: 'Number of step',
            alias: 's',
            type: 'number',
            default: 1
        },

        latest: {
            describe: 'Run to the latest migration',
            alias: 'l',
            type: 'boolean',
            default: false
        }
    };

    @inject(DatabaseMigrator)
    protected async execute({ latest, step }: any, migrator: DatabaseMigrator) {
        const migrated = latest ? await migrator.latest(): await migrator.up(step);
        migrated.length ?
            await this.output.info('log', migrated.join('\n')) :
            await this.output.info('log', 'Nothing to migrate')
        ;
    }
}
