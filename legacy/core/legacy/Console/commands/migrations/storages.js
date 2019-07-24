import fs     from "fs";
import moment from "moment";
import lodash from "lodash";
import ViewEngineNunjucks from "../../../View/NunjucksEngine/ViewEngineNunjucks";
import chalk  from "chalk";

export const command     = "storages [table]";
export const desc        = "Create a migration for making storages table";
export const builder     = yargs => {
    yargs.positional("table", {
        describe: "Table name",
        default: "fusion_storages",
        type: "string"
    });
};

export const handler = ({rc, table, container}) => {

    const viewEngine = container.make(ViewEngineNunjucks);
    const className  = "Create" + lodash.upperFirst(lodash.camelCase(table)) + "TableMigration";
    const migration  = "create_" + table + "_table";

    const templateString = fs.readFileSync(__dirname + '/templates/storage.js.template').toString();
    const fileName       = moment().format("YYYYMMDD_HHmmss") + "_" + migration + ".migration.js";
    const migrationCode  = viewEngine.getEnv().renderString(templateString, {tableName: table, className});

    fs.writeFileSync(rc.migrations.directory + "/" + fileName, migrationCode);
    console.log(chalk.cyan(fileName));
};
