#! /usr/local/bin/node

require("@babel/register");
require("ts-node").register({
    transpileOnly: true
});

const findUp        = require('find-up');
const fs            = require('fs');
const configPath    = findUp.sync(['.fusionrc', '.fusionrc.json']);
const config        = configPath ? JSON.parse(fs.readFileSync(configPath).toString()) : {};
if (!config.app) {
    console.log('It seems you are not in a fusion like framework!');
    process.exit(3);
}

let tokamak = require(process.cwd() + '/' + config.app).default;

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
    yargs
        .pkgConf('fusion')
        .demandCommand()
        .help()
        .wrap(80)
        .argv
;
