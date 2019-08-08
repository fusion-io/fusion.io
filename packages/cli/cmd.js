const yargs = require('yargs');

module.exports = yargs
    .command(require('./cmds/app'))
    .command(require('./cmds/init'))
    .demandCommand()
    .help()
    .wrap(80)
    .argv
;
