import { Command } from "@fusion.io/commands";
import {inject, singleton, tokamak} from "@fusion.io/core";
import fs from "fs";
import Seeder from "../../seeder/Seeder";

@singleton()
export default class Run extends Command {

    command  = 'run <name>';

    describe = 'Run a database seeder';

    @inject('config')
    protected async execute({ name }: any, { database: { seeder: { directory: seederDirectory } } }: any) {
        const seederFile = seederDirectory + '/' + name + '.seeder.js';

        if (!fs.existsSync(seederFile)) {
            throw new Error(`Could not resolve the seeder named [${name}]. Tried to resolve seeder at [${seederFile}]`);
        }

        const SeederConstructor = require(seederFile).default;
        const seeder: Seeder    = new SeederConstructor(this.input, this.output);

        await seeder.run();

        this.output.info('log', `Executed seeder [${name}]`);
    }
}
