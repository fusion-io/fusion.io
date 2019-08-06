import { tokamak } from "@fusion.io/core";
import { Yargs } from "./Contracts";
import chalk from "chalk";
import Input from "./io/Input";
import Output from "./io/Output";

const kebabCase = require('lodash.kebabcase');

export type CommandConstructor = {
    new(...args: any[]): Command
}

export default abstract class Command {

    protected command: string = '';

    protected describe: string = '';

    protected aliases: string[] = [];

    protected middlewares: Function[] = [];

    protected options: any = [];

    protected input(type?: string) {
        return tokamak.make<Input>(Input).adapter(type);
    }

    protected output(type?: string) {
        return tokamak.make<Output>(Output).adapter(type);
    }

    protected async asking(argv: any, ...args: any[]) {
        return { };
    }

    protected builder(yargs: Yargs) {
        this.subCommands.forEach(Cmd => {
            const cmd = tokamak.make<Command>(Cmd);
            yargs.command(cmd.toYargs());
        });
    };

    protected subCommands: CommandConstructor[] = [ ];

    protected abstract execute(argv: any, ...args: any): any;

    toYargs() {
        const instance = this;

        return {

            command  : this.command || kebabCase(this.constructor.name),
            aliases  : this.aliases,
            describe : chalk.gray(this.describe) || chalk`{gray Command created by [{cyan ${this.constructor.name}]}}`,

            middlewares: [
                (argv: any) => {
                    if (argv.interactive) {
                        return instance.asking(argv).then((parsed: any) => ({...argv, ...parsed}));
                    }
                },
                ...instance.middlewares
            ],

            handler(argv: any): void {
                Promise.resolve(instance.execute(argv)).catch(error => console.error(error));
            },

            builder(yargs: any): void {
                Object.entries(instance.options).forEach(([key, options]) => yargs.option(key, options));

                instance.builder(yargs);
            }
        }
    }
}
