import chalk from 'chalk';
import {Storage} from "./../../../Contracts";

export const command = 'clean';
export const desc    = 'Cleanup the expired storage items';

export const handler = async ({container, storage}) => {

    const sm = container.make(Storage);
    await sm.adapter(storage).cleanUp();

    console.log(chalk.green('Done'));

    process.exit(0);
};
