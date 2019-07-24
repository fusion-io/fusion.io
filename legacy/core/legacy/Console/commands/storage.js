export const command     = 'storage';
export const desc        = 'Storage commands';
export const builder     = (yargs) => {
    yargs.commandDir(__dirname + '/storage');
    yargs.option('s', {
        alias: 'storage',
        description: "The storage name",
        type: "string"
    })
};

export const handler     = () => { };
