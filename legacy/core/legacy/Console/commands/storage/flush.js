import {Storage} from "./../../../Contracts";
import chalk     from "chalk";

export const command     = 'flush';
export const desc        = 'Flush storage data';
export const handler     = async ({container, storage}) => {

    const sm = container.make(Storage);
    await sm.adapter(storage).flush();

    console.log(chalk.green('Done'));
    process.exit(0);
};
