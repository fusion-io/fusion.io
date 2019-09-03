const fs = require('fs-extra');

class Proton {
    async generate({language, sourceDirectory, viewDirectory}) {
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

        const content = fs.readFileSync(__dirname + '/templates/config.js.template')
            .toString()
            .replace(/:viewDirectory:/g, viewDirectory);

        await fs.outputFile(baseAppDirectory + '/' + 'config/index.js', content, 'utf8');
        await fs.outputJson(baseAppDirectory + '/' + '.fusionrc', {
            app: sourceDirectory + '/app',
            live: {
                spin: true,
                port: "2512",
                server: "src/server",
                reloadFiles: [
                    "^((?!node_modules).)*$",
                    "@fusion.io"
                ]
            }
        });

        const tsConfig = `{
  "compilerOptions": {
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "outDir": "build",
    "target": "es6"
  },
  "include": [
    "./${sourceDirectory}"
  ]
}
`;
        fs.writeFileSync(baseAppDirectory + '/' + 'tsconfig.json', tsConfig);
    }

    static resolveTemplatePath(parentDirectory, language) {
        return (language === 'TypeScript') ?
            (parentDirectory + '/ts') :
            (parentDirectory + '/es')
        ;
    }
}

module.exports = new Proton();
