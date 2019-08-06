import { Command } from "@fusion.io/commands";
import Serve from "./Serve";
import { singleton } from "@fusion.io/core";

@singleton()
export default class Proton extends Command {

    subCommands = [
        Serve
    ];

    protected execute() { }
}
