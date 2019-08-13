import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import chalk from "chalk";
import DatabaseManager from "../../DatabaseManager";

@singleton()
export default class Connections extends Command {

    command = 'database-connections';

    aliases = ['databases', 'db'];

    describe = 'Check the connectivity of the database connections';

    @inject('config', DatabaseManager)
    protected async execute(argv: any, { database: { connections } } : any, dbm: DatabaseManager) {

        const tasks = Object.keys(connections).map(connection => {
            return {
                title: connection,
                task: async () => {
                    await dbm.connection(connection).raw('select 1 + 1 as result');
                }
            }
        });

        try {
            await this.output.operate('tasks', tasks, { concurrent: true, exitOnError: false });
        } catch (e) {
            this.output.debug('log', e.stack);
        }

    }
}
