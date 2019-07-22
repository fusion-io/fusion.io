import chalk from "chalk";

export const command     = "run <seeder>";
export const desc        = "Run a seeder";
export const builder     = yargs => {
    yargs.positional("seeder", {
        description: "Seeder name",
        type: "string"
    });
};

export const handler = async ({container, seeder, rc}) => {

    const Seeder = require(
        process.cwd() + '/' + rc.seeders.directory + '/' + seeder + 'Seeder.seeder.js'
    ).default;

    console.log(chalk.gray(`Seeding ${chalk.cyan(seeder)}`));

    const seederInstance = new Seeder();

    await seederInstance.seed();

    console.log(chalk.green("Done"));

    process.exit(0);
};
