const yargs = require('yargs');

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

module.exports = yargs
    .command(require('./cmds/live-server'))
    .command(require('./cmds/app'))
    .command(require('./cmds/init'))
    .demandCommand()
    .help()
    .wrap(120)
    .argv
;
