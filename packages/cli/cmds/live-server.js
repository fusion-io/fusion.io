const chalk     = require('chalk');
const http      = require('http');
const faker     = require('faker');
const chokidar  = require('chokidar');
const ora       = require('ora');

exports.describe = 'Start a live server';

exports.command  = 'live [server]';

exports.builder = yargs => {
    yargs.positional('server', {
        describe: 'Server file path'
    });

    yargs.option('port', {
        alias: 'p',
        describe: 'Listen on port',
        type: 'number',
        default: 2512
    });

    yargs.option('excepts', {
        alias: 'e',
        describe: 'RegExp for ignoring files',
        type: 'string',
        default: 'node_modules|.\.log|^\.'
    });

    yargs.option('spin', {
        alias: 's',
        describe: 'Using spinning ui',
        type: 'boolean',
        default: false
    })
};

exports.builder = (yargs) => {
    const findUp        = require('find-up');
    const fs            = require('fs');
    const configPath    = findUp.sync(['.fusionrc', '.fusionrc.json']);
    const rc            = configPath ? JSON.parse(fs.readFileSync(configPath).toString()) : {};

    yargs.config({rc});
};

exports.handler = (options) => {
    const mergeOptions = {...options, ...options.rc.live};
    const watcher = chokidar.watch(process.cwd(), { ignored: new RegExp(mergeOptions.excepts || 'node_modules') });

    console.log(chalk`{gray Starting the development server at {cyan ${mergeOptions.port}}}`);

    const spinner = ora();

    if (mergeOptions.spin) {
        spinner.start();
        spinner.color = 'cyan';
        spinner.text= chalk`{gray Starting}`;
    } else {
        console.log(chalk`{gray Starting}`);
    }

    watcher.on('ready', () => {
        watcher.on('all', () => {
            Object.keys(require.cache).forEach((id) => {
                if (!require.cache[id].filename.match(/node_modules/)) {
                    delete require.cache[id];
                }
            });
            process.nextTick(() => {
                if (mergeOptions.spin) {
                    spinner.color = 'cyan';
                    spinner.text = chalk`{gray It\'s reloaded, {cyan ${faker.name.lastName()}}!}`;
                } else {
                    console.log(chalk`{gray It\'s reloaded, {cyan ${faker.name.lastName()}}!}`);
                }
            });
        });

        http.createServer((request, response) => {

            try {
                let reloaded  = require(process.cwd() + '/' + mergeOptions.server);

                if ('function' === typeof reloaded.default) {
                    reloaded = reloaded.default;
                }

                reloaded(request, response);
            } catch (e) {
                if (mergeOptions.spin) {
                    spinner.color = 'red';
                    spinner.text = chalk.red("Oops! " + e.message + '. ') + chalk.gray('Waiting for change.');
                } else {
                    console.log(chalk.red("Oops! " + e.message + '. ') + chalk.gray('Waiting for change.'));
                }
            }

        }).listen(mergeOptions.port);

        if (mergeOptions.spin) {
            spinner.color = 'cyan';
            spinner.text = chalk.gray('Started');
        } else {
            console.log(chalk.gray('Started'));
        }
    });
};
