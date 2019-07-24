export const command = ['framework', '$0'];
export const desc    = "Fusion CLI";
export const builder = yargs => {
    yargs.commandDir(__dirname + '/commands')
};

export const handler = () => { };
