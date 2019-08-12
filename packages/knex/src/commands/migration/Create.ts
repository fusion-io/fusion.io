import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import DatabaseMigrator from "../../migration/DatabaseMigrator";

@singleton()
export default class Create extends Command {

    command = 'create <comment>';

    describe = 'Create a new migration';

    @inject(DatabaseMigrator)
    protected async execute({ comment }: any, migrator: DatabaseMigrator) {
        await migrator.manager.create(comment);
    }
}
