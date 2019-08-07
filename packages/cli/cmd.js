const yargs = require('yargs');

module.exports =
    yargs
        .command(require('./cmds/init'))
        .command(require('./cmds/app'))
        .demandCommand()
        .help()
        .wrap(80)
        .argv
;
