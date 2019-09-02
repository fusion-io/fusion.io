import { Command } from "@fusion.io/commands";
import { inject, singleton } from "@fusion.io/core";
import { Layer } from "koa-router";
import chalk  from "chalk";
import Router from "../http/Router";

@singleton()
export default class Routes extends Command {

    describe = 'List all routes';

    @inject(Router)
    protected async execute(argv: any, router: Router) {
        const routes = router.stack.filter((layer: Layer) => layer.opts.end).map((layer: Layer, index) =>
            [ index + 1, layer.methods.join(','), layer.path, layer.name ].map(i => chalk.cyan(i ? i.toString() : ''))
        );

        await this.output.operate('table', { head: [ '#', 'method', 'url', 'name'] }, routes)
    }
}
