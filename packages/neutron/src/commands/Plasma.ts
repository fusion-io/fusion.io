import { Command } from "@fusion.io/commands";
import { singleton } from "@fusion.io/proton";
import parseSpec from "./parseSpec";

@singleton()
export default class Plasma extends Command {

    describe = 'Generate the Plasma class';

    middlewares = [parseSpec];

    protected async execute(argv: any, ...args: any) {

    }
}
