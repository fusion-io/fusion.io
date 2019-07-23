declare type DatabaseConfig = {
    use: string,
    connections: any
}

export const plasma = {
    dependencies: ['config'],

    bootstrapper: ({database}: {database: DatabaseConfig}) => {

        console.log(database);
    }
};
