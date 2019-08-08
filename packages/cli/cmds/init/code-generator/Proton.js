const fs = require('fs-extra');

class Proton {
    async generate({language, sourceDirectory, viewDirectory, configFile, storageDirectory}) {
        const baseAppDirectory = process.cwd();

        // Copy source code
        await fs.copy(
            Proton.resolveTemplatePath(__dirname + '/templates/src', language),
            baseAppDirectory + '/' + sourceDirectory
        );

        // Copy views
        await fs.copy(
            __dirname + '/templates/views',
            baseAppDirectory + '/' + viewDirectory
        );

        const configPlaceHolder = require('./configPlaceHolder');
        const content = "module.exports = :config:;"
            .replace(/:config:/, JSON.stringify(configPlaceHolder, null, 4))
        ;

        await fs.outputFile(baseAppDirectory + '/' + 'config/index.js', content, 'utf8');
        await fs.outputJson(baseAppDirectory + '/' + '.fusionrc', {
            app: sourceDirectory
        });
    }

    static resolveTemplatePath(parentDirectory, language) {
        return (language === 'TypeScript') ?
            (parentDirectory + '/ts') :
            (parentDirectory + '/es')
        ;
    }
}

module.exports = new Proton();
