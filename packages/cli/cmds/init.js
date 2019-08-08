exports.command = 'init';
exports.describe = 'Initial a fusion project';
exports.builder = yargs => {
    yargs.commandDir(__dirname + '/init');
};
