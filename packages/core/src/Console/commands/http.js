export const command     = 'http';
export const desc        = 'Http commands';
export const builder     = (yargs) => {
    yargs.commandDir(__dirname + '/http');
};

export const handler     = () => {};
