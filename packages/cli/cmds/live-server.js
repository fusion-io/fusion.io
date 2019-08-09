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
        describe: 'Listen on port',
        type: 'number',
        default: 2512
    });
};

exports.handler = ({server, port}) => {
    const watcher = chokidar.watch(process.cwd(), { ignored: /node_modules/ });

    console.log(chalk`{gray Starting the development server at {cyan ${port}}}`);

    const spinner = ora().start();

    spinner.color = 'cyan';
    spinner.text= chalk`{gray Starting}`;

    watcher.on('ready', () => {
        watcher.on('all', () => {
            Object.keys(require.cache).forEach((id) => {
                // We'll clear all of the require cache excepts
                // the native C++ node modules
                if (!require.cache[id].filename.endsWith('.node')) {
                    delete require.cache[id];
                }
            });
            process.nextTick(() => {
                spinner.color = 'cyan';
                spinner.text = chalk`{gray It\'s reloaded, {cyan ${faker.name.lastName()}}!}`;
            });
        });

        http.createServer((request, response) => {

            try {
                let reloaded  = require(process.cwd() + '/' + server);

                if ('function' === typeof reloaded.default) {
                    reloaded = reloaded.default;
                }

                reloaded(request, response);
            } catch (e) {
                spinner.color = 'red';
                spinner.text = chalk.red("Oops! " + e.message + '. ') + chalk.gray('Waiting for change.');
            }

        }).listen(port);

        spinner.color = 'cyan';
        spinner.text = chalk.gray('Started');
    });
};
