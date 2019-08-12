import { Command } from "@fusion.io/commands";
import {inject, singleton} from "@fusion.io/core";
import DatabaseMigrator from "../../migration/DatabaseMigrator";

@singleton()
export default class Init extends Command {

    @inject(DatabaseMigrator)
    protected async execute(argv: any, migrator: DatabaseMigrator) {
        await migrator.state.prepare();
    }
}
