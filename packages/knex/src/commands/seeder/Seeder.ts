import { Command } from "@fusion.io/commands";
import { singleton } from "@fusion.io/core";
import Create from "./Create";
import Run from "./Run";

@singleton()
export default class Seeder extends Command {

    command = 'seeder';

    describe = 'Seeder commands';

    subCommands = [Create, Run];

    protected async execute(argv: any, ...args: any) {
        return;
    }
}
