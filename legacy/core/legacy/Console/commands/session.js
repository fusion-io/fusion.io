export const command     = 'session';
export const desc        = 'Session commands';
export const builder     = (yargs) => {
    yargs.commandDir(__dirname + '/session');
};

export const handler     = () => { };
