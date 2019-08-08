const inquiry = require('inquirer');

module.exports = async argv => {
    return inquiry.prompt([
        {
            type: 'list',
            name: 'language',
            message: 'Please choose your programming language',
            choices: [
                'ECMAScript',
                'TypeScript'
            ],
            default: 'ECMAScript'
        },
        {
            name: 'sourceDirectory',
            message: 'Where will be your source code?',
            default: 'src'
        },

    ]).then(answers => ({
        ...answers,
        ...argv
    }))
};
