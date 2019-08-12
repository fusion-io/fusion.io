import { Command } from "@fusion.io/commands";
import { singleton } from "@fusion.io/core";
import Up from "./Up";
import Create from "./Create";
import Init from "./Init";
import Down from "./Down";

@singleton()
export default class Migration extends Command {

    subCommands = [ Create, Up, Down, Init ];

    protected async execute(argv: any) {
        console.log('listing the migrations');
    }
}
