import DatabaseManager from "./DatabaseManager";
declare type DatabaseConfig = {
    use: string,
    connections: any
}

export {
    DatabaseManager
}

export const plasma = {
    dependencies: ['config', DatabaseManager],

    bootstrapper: () => {

    }
};
