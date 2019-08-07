const { Command, ConsoleKernel } = require("@fusion.io/commands");
const { tokamak, Plasma } = require("@fusion.io/core");

const chalk = require('chalk');
const http  = require('http');
const faker = require('faker');

class Watch extends Command {

    // noinspection JSCheckFunctionSignatures
    async execute(argv, ...args) {

        const chokidar = require('chokidar');
        const watcher = chokidar.watch(process.cwd());
        const spinner = await this.output.operate('spinner');
        const port    = process.env.PORT || 2512;
        await this.output.operate('log', chalk`{gray Starting the development server at {cyan ${port}}}`);

        spinner.start(chalk`{gray Starting}`);

        watcher.on('ready', () => {
            watcher.on('all', () => {
                Object.keys(require.cache).forEach((id) => {
                    if (!/[\/\\]node_modules[\/\\]/.test(id)) {
                        delete require.cache[id];
                    }
                });
                process.nextTick(() => {
                    spinner.start(chalk`{gray It\'s reloaded, {cyan ${faker.name.findName()}}!}`);
                });
            });

            http.createServer((request, response) => {
                // TODO will read the configuration file

                // We may don't need this.
                // We need to figure out how to load the kernel without require
                const {kernel} = require(process.cwd() + '/src/app');
                const fusion = require(process.cwd() + '/src/app').default;

                // Start fusion
                fusion.start();

                // Handle the HTTP request
                kernel.callback()(request, response);
            }).listen(port);
            // noinspection JSValidateTypes

            spinner.start(chalk.gray('Started'));
        });
    }
}

tokamak.singleton(Watch, () => new Watch());


class CliPlasma extends Plasma {

    // noinspection JSCheckFunctionSignatures
    compose() {
        tokamak.make(ConsoleKernel)
            .register(Watch);
    }
}

module.exports = CliPlasma;
