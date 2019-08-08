const inquirer  = require('inquirer');
const generator = require('./code-generator/Proton');

exports.command  = "proton";
exports.describe = "Init a @fusion.io/proton project";
exports.handler  = (config) => {
    generator.generate(config).then(
        // TODO
    );
};

exports.middlewares = [require('../../app-inqurier'), argv => {
    return inquirer.prompt([
        {
            name: 'viewDirectory',
            message: 'where will be your views directory?',
            default: 'views'
        },
        {
            name: 'storageDirectory',
            message: "where will be your application\'s storage directory?",
            default: "storages"
        }
    ]).then(answers => ({
        ...answers,
        ...argv
    }))
}];
