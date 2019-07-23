import {Storage} from "./../../../Contracts";

export const command     = 'dump <key>';
export const desc        = 'Dump a storage item';

export const builder     = yargs => {
    yargs.positional('key', {
        description: "Storage key",
        type: "string"
    });

    yargs.option('t', {
        alias: 'tag',
        description: "Dump by tag instead of key"
    })
};

export const handler = async ({container, storage, key, tag}) => {

    const sm     = container.make(Storage);
    const result = tag ? await sm.adapter(storage).getByTag(key) : await sm.adapter(storage).get(key);

    console.log(result);

    process.exit(0);
};
