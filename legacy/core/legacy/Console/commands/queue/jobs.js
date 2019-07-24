import chalk          from "chalk";
import Table          from 'cli-table3';
import QueueRegistry from "../../../Queue/QueueRegistry";

const print = (registry) => {
    const table = new Table({
        head: [chalk.cyan('#'), chalk.cyan('job')],
        colWidths: [7, 30]
    });

    let i = 0;

    registry.forEach((execution, job) => {
        table.push([++i, job]);
    });

    return table;
};

export const command = "jobs";
export const desc    = "List registered jobs";

export const handler = ({container}) => {

    const registry = container.make(QueueRegistry);

    console.log(print(registry).toString());
};
