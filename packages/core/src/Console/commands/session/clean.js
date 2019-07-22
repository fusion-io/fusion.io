import chalk from 'chalk';
import SessionStorageManager from "../../../Session/SessionStorageManager";

export const command     = 'clean';
export const desc        = 'Cleanup the expired sessions';

export const handler     = async ({container}) => {

    const sm = container.make(SessionStorageManager);
    await sm.adapter().cleanUp();

    console.log(chalk.green('Done'));

    process.exit(0);
};
