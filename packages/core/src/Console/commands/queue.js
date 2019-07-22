export const command = "queue";
export const desc    = "Queue commands";
export const builder = (yargs) => {
    yargs.commandDir(__dirname + '/queue');
};
