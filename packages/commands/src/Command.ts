import { tokamak } from "@fusion.io/core";
import { Yargs } from "./Contracts";
import chalk from "chalk";
import Input from "./io/Input";
import Output from "./io/Output";
import ConsoleKernel from "./ConsoleKernel";

const kebabCase = require('lodash.kebabcase');

export type CommandConstructor = {
    new(...args: any[]): Command
}

/**
 * Command class
 */
export default abstract class Command {

    /**
     * The command signature
     */
    protected command: string = '';

    /**
     * Description
     */
    protected describe: string = '';

    /**
     * Aliases
     */
    protected aliases: string[] = [];

    /**
     * List of the command middlewares
     */
    protected middlewares: Function[] = [];

    /**
     * List of the command options / arguments
     */
    protected options: any = [];

    /**
     * The input service of the command. We can use it to interact
     * with the user
     *
     */
    protected input: Input = tokamak.make<Input>(Input);

    /**
     * The output service of the command. We can use it
     * to showing feedback to the user.
     */
    protected output: Output = tokamak.make<Output>(Output);

    /**
     * List of Sub Commands
     */
    protected subCommands: CommandConstructor[] = [ ];

    /**
     * Interact with the user just before the
     * command started.
     *
     * This is a good place to perform interaction
     * and getting the user answer, after that,
     * the user's response will also be the command
     * argument/option
     *
     * @param argv
     * @param args
     */
    protected async interact(argv: any, ...args: any[]) {
        return { };
    }

    /**
     * Builder to make the Sub Command for Yargs
     *
     * @param yargs
     */
    protected builder(yargs: Yargs) {
        this.subCommands.forEach(Cmd => {
            const cmd = tokamak.make<Command>(Cmd);
            yargs.command(cmd.toYargs());
        });
    };

    /**
     * Convert this command into Yargs command.
     */
    toYargs() {
        const instance = this;

        return {

            command  : this.command || kebabCase(this.constructor.name),
            aliases  : this.aliases,
            describe : chalk.gray(this.describe) || chalk`{gray Command created by [{cyan ${this.constructor.name}}]}`,

            middlewares: [
                (argv: any) => {
                    this.input.setInteractive(argv.interactive);
                    this.output.setVerbosity(argv.verbose);

                    return instance.interact(argv).then((parsed: any) => ({...argv, ...parsed}));
                },
                ...instance.middlewares
            ],

            handler(argv: any): void {
                (async() => {
                    try {
                        await instance.execute(argv);
                        return 0;
                    } catch (error) {
                        await instance.output.error('box', error.message);
                        await instance.output.debug('log', error.stack);

                        tokamak.make<ConsoleKernel>(ConsoleKernel).emit('error', error);

                        return error.code || -1;
                    }
                })()
                ;
            },

            builder(yargs: any): void {
                // TODO need to work with positional
                Object.entries(instance.options).forEach(([key, options]) => yargs.option(key, options));
                instance.builder(yargs);
            }
        }
    }

    /**
     * Execute the command.
     *
     * @param argv
     * @param args
     */
    protected async abstract execute(argv: any, ...args: any): Promise<void>;
}
