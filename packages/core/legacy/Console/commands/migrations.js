export const command     = 'migrations';
export const desc        = 'Migration commands';
export const builder     = (yargs) => {
    yargs.commandDir(__dirname + '/migrations');
};

export const handler = () => {};
