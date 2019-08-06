export declare type Yargs = {
    command(command: YargsCommand): void
}

export declare type YargsCommand = {
    command: string,
    handler(argv: any): void,
    aliases?: string[],
    describe?: string,
    builder?(yargs: Yargs): void,
}
