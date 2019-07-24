import fs from "fs";
import moment from "moment";
import lodash from "lodash";
import ViewEngineNunjucks from "../../../View/NunjucksEngine/ViewEngineNunjucks";
import chalk from "chalk";

export const command = "create <migration>";
export const desc    = "Create a database migration";
export const builder = yargs => {
    yargs.positional("migration", {
        describe: "Migration name"
    });

    yargs.option("n", {
        alias: "new",
        describe: "Create a new table with name",
        type: "string"
    });

    yargs.option("a", {
        alias: "alter",
        describe: "Alter a table with name",
        type: "string"
    });
};

export const handler = ({rc, migration, n, alter, container}) => {

    const viewEngine = container.make(ViewEngineNunjucks);
    const className  = lodash.upperFirst(lodash.camelCase(migration)) + "Migration";

    let tableName = null;
    let template  = null;

    // const fileName   = ne

    if (n) {
        template  = "newTable";
        tableName = n;
    }

    else if (alter) {
        template  = "alterTable";
        tableName = alter;
    }

    else {
        template  = "migration";
    }

    const templateString = fs.readFileSync(__dirname + `/templates/${template}.js.template`).toString();
    const fileName       = moment().format("YYYYMMDD_HHmmss") + "_" + migration + ".migration.js";
    const migrationCode  = viewEngine.getEnv().renderString(templateString, {tableName, className});

    fs.writeFileSync(rc.migrations.directory + "/" + fileName, migrationCode);
    console.log(chalk.cyan(fileName));;
};
