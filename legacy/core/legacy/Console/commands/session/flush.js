import chalk from "chalk";
import SessionStorageManager from "../../../Session/SessionStorageManager";

export const command     = 'flush';
export const desc        = 'Flush session data';
export const handler     = async ({container}) => {

    const sm = container.make(SessionStorageManager);
    await sm.adapter().flush();

    console.log(chalk.green('Done'));
    process.exit(0);
};
