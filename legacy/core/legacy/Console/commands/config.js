export const command     = 'config';
export const desc        = 'Config commands';
export const builder     = (yargs) => {
    yargs.commandDir(__dirname + '/config');
};

export const handler     = () => { };
