const chalk     = require('chalk');
const http      = require('http');
const faker     = require('faker');
const chokidar  = require('chokidar');
const ora       = require('ora');

class MessageContext {
    constructor(spinner = null) {
        this.spinner = spinner;
    }

    output(message) {
        if (this.spinner) {
            this.spinner.color = 'cyan';
            this.spinner.text  = message;
        } else {
            console.log(message);
        }
    }
}


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
        default: 'node_modules'
    });

    yargs.option('reload-files', {
        alias: 'r',
        describe: 'RegExp for reloading cached files',
        type: 'array',
        default: [
            ['^((?!node_modules).)*$']
        ]
    });

    yargs.option('spin', {
        alias: 's',
        describe: 'Using spinning ui',
        type: 'boolean',
        default: false
    });

    const findUp        = require('find-up');
    const fs            = require('fs');
    const configPath    = findUp.sync(['.fusionrc', '.fusionrc.json']);
    const rc            = configPath ? JSON.parse(fs.readFileSync(configPath).toString()) : {};

    yargs.config(rc);
};

exports.handler = (options) => {
    const mergeOptions = {...options, ...options.live};
    const watcher = chokidar.watch(process.cwd(), { ignored: new RegExp(mergeOptions.excepts) });

    console.log(chalk`{gray Starting the development server at {cyan ${mergeOptions.port}}}`);

    const messageCtx = new MessageContext(mergeOptions.spin ? ora().start() : null);

    messageCtx.output(chalk`{gray Starting}`);

    watcher.on('ready', () => {
        watcher.on('all', () => {
            Object.keys(require.cache).forEach((id) => {
                mergeOptions.reloadFiles.forEach(pattern => {
                    if (
                        // Maybe with the before pattern, the module has already been delete
                        require.cache[id] &&

                        // If the module ends with .node (the C++ extension)
                        // We'll ignore the cache
                        (!require.cache[id].filename.endsWith('.node')) &&

                        // Check the if the file matched the user's options
                        new RegExp(pattern).test(require.cache[id].filename))
                    {
                        delete require.cache[id];
                    }
                })
            });
            process.nextTick(() => {
                messageCtx.output(chalk`{gray It\'s reloaded, {cyan ${faker.name.lastName()}}!}`);
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
                messageCtx.output(chalk.red("Oops! " + e.message + '. \n') + chalk.gray('Waiting for change.'));
            }

        }).listen(mergeOptions.port);

        messageCtx.output(chalk.gray('Started'));
    });
};
