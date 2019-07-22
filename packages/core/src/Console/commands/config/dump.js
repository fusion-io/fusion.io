import {Config} from "../../../Contracts";

export const desc = "Dumps the configuration values";
export const command = "dump [key]";
export const builder = yargs => {
    yargs.positional('key', {
        description: "Config key",
        type: "string",
        default: null
    });
};

export const handler = ({container, key}) => {
    const config = container.make(Config);
    console.log(key === null ? config.hashed : config.get(key));
};
