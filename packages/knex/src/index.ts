import {container} from "@fusion.io/core";
import DatabaseManager from "./DatabaseManager";

export const plasma = {
    compose() {


    },
    boot() {
        const dbm = container.make<DatabaseManager>(DatabaseManager);
        const { database } = container.make('config');

        dbm.configure(database);
    }
};
