export const command     = "seeds";
export const desc        = "Seeding commands";
export const builder     = yargs => {
    yargs.commandDir(__dirname + '/seeds')
};

export const handler     = ({container}) => {

};
