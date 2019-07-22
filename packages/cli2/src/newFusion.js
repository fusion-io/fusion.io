const fs        = require('fs');
const unzipper  = require('unzipper');
const download  = require('download');
const chalk     = require('chalk');
const util      = require('util');
const mkdirp    = util.promisify(require('mkdirp'));
const mv        = util.promisify(require('mv'));
const copy      = require('fs-extra').copy;

exports.command = ['new <application>', 'create <application>'];
exports.description = 'Create a new Fusion application';
exports.handler = ({target, application}) => {

    const appPath = process.cwd() + '/' + application;
    const tmpPath = process.cwd() + '/.fusion.tmp';

    if (fs.existsSync(appPath)) {
        console.warn(chalk.gray(`Directory [${chalk.cyan(appPath)}] already existed. Abort installation process`));
        return;
    }

    console.log(chalk.gray(`Creating [${chalk.cyan(application)}]`));

    mkdirp(tmpPath)
        .then(() => download(target).pipe(unzipper.Extract({ path: tmpPath })).promise())
        .then(() => mv(tmpPath + '/fusion-master', appPath))
        .then(() => copy(appPath + '/config/env/local.env.example.js', appPath + '/config/env/local.env.js'))
        .then(() => {
            console.log(chalk.gray(`Created application at [${chalk.cyan(appPath)}]`));
            console.log(chalk.green(`Your application are now ready. Type following command to get start`));
            console.log(chalk.gray(`cd ${chalk.cyan(application)} && npm install && npm start`));
        })
        .then(() => {
            process.exit(0);
        })
    ;
};

exports.builder = yargs => {

    yargs.positional('application', {
        description: 'Application name. A valid npm package name is required',
    });

    yargs.option('t', {
        description: 'Url of the Fusion release zip',
        alias: 'target',
        default: 'https://github.com/fusion-io/fusion/archive/master.zip'
    })
};
