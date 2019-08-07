import Command from "../Command";
import { singleton, tokamak } from "@fusion.io/core";

@singleton()
export default class Tokamak extends Command {

    describe = 'Dumps Tokamak';

    protected async execute(argv: any, ...args: any) {
        await this.output.operate('log', tokamak);
    }
}
