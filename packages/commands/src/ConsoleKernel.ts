import { singleton, tokamak } from "@fusion.io/core";
import { Yargs } from "./Contracts";
import Command, { CommandConstructor } from "./Command";

@singleton()
export default class ConsoleKernel {

    private commands = new Set<CommandConstructor>();

    public register(Command: CommandConstructor|any) {
        this.commands.add(Command);
        return this;
    }

    public apply(yargs: Yargs|any) {
        this.commands.forEach(CommandConstructor => {
            const cmd = tokamak.make<Command>(CommandConstructor);

            yargs.command(cmd.toYargs())
        });
    }
}
