const { ConsoleKernel, Plasma } = require('@fusion.io/commands');
const CliPlasma = require('./ProtonStart');
const yargs = require('yargs');

module.exports = {
    command: '$0',
    describe: 'Application Commands',
    handler() {
        yargs.showHelp();
    },
    builder(yargs) {
        require("@babel/register")({
            "presets": [["@babel/preset-env", {
                "targets": {
                    "node": "8"
                }
            }]],
            "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
        });
        require("ts-node").register({
            transpileOnly: true,
            compilerOptions: {
                "experimentalDecorators": true,
                "target": "esnext",
                "module": "commonjs",
                "esModuleInterop": true
            }
        });

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

        yargs.config({rc, fusionApp});

        tokamak.fuse(Plasma).fuse(CliPlasma).start();
        tokamak.make(ConsoleKernel).apply(yargs);
    }
};
