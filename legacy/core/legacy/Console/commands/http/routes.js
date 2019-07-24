import Table      from 'cli-table3';
import chalk      from 'chalk';
import Router from "../../../Http/Router";

export const command = 'routes';
export const desc    = 'List the registered routes';

const print = (routes) => {
    const table = new Table({
        head: [chalk.cyan('method'), chalk.cyan('path'), chalk.cyan('name'), chalk.cyan('prefix')],
        colWidths: [10, 40, 40, 30]
    });

    routes.forEach(route => {
        table.push([
            chalk.green(route.methods.join(',')),
            chalk.gray(route.path),
            chalk.gray(route.opts.name),
            chalk.gray(route.opts.prefix)
        ])
    });

    return table;
};

export const handler = ({container}) => {

    const router = container.make(Router);

    console.log(print(router.stack.filter(layer => layer.opts.end)).toString());
};
