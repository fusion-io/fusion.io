import ViewEngineNunjucks from "../../../View/NunjucksEngine/ViewEngineNunjucks";
import fs from "fs";
import chalk from "chalk";

export const command     = "create <seeder>";
export const desc        = "Create a database seeder";
export const builder     = yargs => {
    yargs.positional("seeder", {
        description: "Seeder name"
    });
};

export const handler     = ({container, seeder, rc}) => {
    const templateString = fs.readFileSync(__dirname + '/template/seeder.js.template').toString();
    const viewEngine     = container.make(ViewEngineNunjucks).getEnv();
    const className      = seeder + "Seeder";
    const seederCode     = viewEngine.renderString(templateString, {className});
    const fileName       = rc.seeders.directory + '/' + className + '.seeder.js';

    fs.writeFileSync(fileName, seederCode);
    console.log(chalk.cyan(fileName));;
};
