import { inject, singleton } from "@fusion.io/core";
import chalk from "chalk";
import Command from "../Command";

const lodashGet = require("lodash.get");

@singleton()
export default class Config extends Command {

    command     = "config [xpath]";
    describe    = chalk`Dumps the configuration values with given {cyan xpath}`;

    @inject('config')
    protected async suggest(answersSoFar: string, input: string, config: any) {

        if (!input) return Object.keys(config);

        let segments = input.split('.');
        let lastSegment = segments.pop();

        if (!segments.length) return Object.keys(config).filter(k => k.startsWith(input));

        const foundValueSoFar = lodashGet(config, segments.join('.'), {});
        return Object.keys(foundValueSoFar)
            .filter(k => k.startsWith(lastSegment as string))
            .map(v => segments.join('.') + '.' + v)
        ;
    }

    protected async asking(argv: any) {
        return this.input.adapter('inquiry').asking([{
                type: 'autocomplete',
                name: 'xpath',
                suggestOnly: true,
                source: this.suggest
            }])
    }

    @inject('config')
    public async execute({ xpath }: { xpath: string }, config: any) {
        await this.output.adapter('log').showing(xpath ? lodashGet(config, xpath) : config)
    }
}
