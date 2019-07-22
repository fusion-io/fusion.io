const fs            = require('fs');
const yargs         = require('yargs');
const findUp        = require('find-up');
const rcPath        = findUp.sync(['.fusionrc', '.fusionrc.json']);
const rc            = rcPath ? JSON.parse(fs.readFileSync(rcPath)) : {};

const bootFusion = async (argv) => {
    if (!argv.container) {
        const EventEmitter  = require('events').EventEmitter;
        const bootstrap     = require(process.cwd() + '/' + rc['bootstrap']);
        const event         = new EventEmitter();

        const container = await bootstrap.default(event);

        return {
            ...argv,
            container
        }
    }

    return argv;
};


const argv = yargs
    .command(require('./newFusion'));


if (rcPath) {
    require('@babel/register')({
        "plugins": [
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            "babel-plugin-dynamic-import-node"
        ],
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "node": "8"
                    }
                }
            ]
        ]
    });

    argv.command({...require(process.cwd() + '/' + rc.console).default, middleware: [bootFusion]})
        .commandDir(process.cwd() + '/' + rc.commands)
        .middleware(bootFusion)
        .middleware(async argv => {
            if (!argv.rc) {
                return { ...argv, rc }
            }
            return argv;
        })
}

module.exports = argv
    .help()
    .argv
;
