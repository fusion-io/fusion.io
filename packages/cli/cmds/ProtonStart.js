const { Command, ConsoleKernel } = require("@fusion.io/commands/lib/index");
const { tokamak, Plasma } = require("@fusion.io/core/lib/index");

const chalk = require('chalk');
const http  = require('http');
const faker = require('faker');
const chokidar = require('chokidar');

class ProtonStart extends Command {


    // noinspection JSCheckFunctionSignatures
    async execute({rc}) {
        const watcher = chokidar.watch(process.cwd());
        const spinner = await this.output.operate('spinner');
        const port    = process.env.PORT || 2512;

        await this.output.operate('log', chalk`{gray Starting the development server at {cyan ${port}}}`);

        spinner.start(chalk`{gray Starting}`);

        watcher.on('ready', () => {
            watcher.on('all', () => {
                Object.keys(require.cache).forEach((id) => {
                    delete require.cache[id];
                });
                process.nextTick(() => {
                    spinner.start(chalk`{gray It\'s reloaded, {cyan ${faker.name.findName()}}!}`);
                });
            });

            http.createServer((request, response) => {

                try {
                    // We may don't need this.
                    // We need to figure out how to load the kernel without require
                    const reloaded  = require(process.cwd() + '/' + rc.app);
                    const fusion    = reloaded.default;

                    if (!reloaded.protonKernel) {
                        throw new Error("There are no protonKernel in your app export");
                    }


                    // Start fusion
                    fusion.start();

                    // Handle the HTTP request
                    reloaded.protonKernel.callback()(request, response);
                } catch (e) {
                    spinner.start(chalk.red("Oops! " + e.message + '. ' + chalk.gray('Waiting for change.')))
                }

            }).listen(port);
            // noinspection JSValidateTypes

            spinner.start(chalk.gray('Started'));
        });
    }
}

tokamak.singleton(ProtonStart, () => new ProtonStart());


class CliPlasma extends Plasma {

    // noinspection JSCheckFunctionSignatures
    compose() {
        tokamak.make(ConsoleKernel)
            .register(ProtonStart);
    }
}

module.exports = CliPlasma;
