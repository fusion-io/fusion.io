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
        yargs
            .option('interactive', {
                alias: 'i',
                description: 'Turn on interactive mode',
                default: false,
                type: 'boolean'
            })
            .option('verbose', {
                alias: 'v',
                describe: 'Set verbosity level',
                default: 2,
                type: 'count'
            })
        ;

        this.commands.forEach(CommandConstructor => {
            const cmd = tokamak.make<Command>(CommandConstructor);

            yargs.command(cmd.toYargs())
        });
    }
}
