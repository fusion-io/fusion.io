import { Command } from "@fusion.io/commands";
import { singleton, inject } from "@fusion.io/core";
import fs from "fs";

@singleton()
export default class Create extends Command {

    command  = 'create <name>';

    describe = 'Create a new database seeder';

    @inject('config')
    protected async execute({ name }: any, { database: { seeder } } : any) {
        const template   = fs.readFileSync(__dirname + '/../../../resources/Seeder.js.template').toString();
        const sourceCode = template.replace(/:className:/, name);
        const outputFile = seeder.directory + '/' + name + '.seeder.js';

        if (fs.existsSync(outputFile)) {
            throw new Error(`Seeder file [${outputFile}] already existed. Aborted!`);
        }

        fs.writeFileSync(outputFile, sourceCode);

        this.output.info('log', outputFile);
    }
}
