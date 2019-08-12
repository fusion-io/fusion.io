const { ConsoleKernel, Plasma } = require('@fusion.io/commands');
const chalk = require('chalk');
const yargs = require('yargs');

module.exports = {
    command: 'app',
    describe: 'Application Commands',
    handler() {
        yargs.showHelp();
    },
    builder(yargs) {
        const findUp        = require('find-up');
        const fs            = require('fs');
        const configPath    = findUp.sync(['.fusionrc', '.fusionrc.json']);
        const rc            = configPath ? JSON.parse(fs.readFileSync(configPath).toString()) : {};

        if (!rc.app) {
            console.log('It seems you are not in a fusion framework root directory!');
            process.exit(3);
        }

        const fusionApp = require(process.cwd() + '/' + rc.app);
        const tokamak = fusionApp.default;
        const consoleKernel = tokamak.make(ConsoleKernel);

        consoleKernel.on('error', (error) => {
            console.error(error);
            process.exit(1);
        });

        yargs.config({rc, fusionApp});

        tokamak.fuse(Plasma).start();
        tokamak.make(ConsoleKernel).apply(yargs);
    }
};
