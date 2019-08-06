const tokamak = require(process.cwd() + '/app').default;
const { ConsoleKernel, Plasma } = require('@fusion.io/commands');
const yargs = require('yargs');

tokamak
    .fuse(Plasma)
    .start()
;

const kernel = tokamak.make(ConsoleKernel);

kernel
    .apply(yargs);

module.exports =
    yargs.demandCommand()
        .help()
        .wrap(72)
        .argv
;
