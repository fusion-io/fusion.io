import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import DatabaseManager from "./DatabaseManager";

export default class Plasma extends CorePlasma {

    @inject(DatabaseManager)
    compose(dbm: DatabaseManager) {

        const { database } = this.config;

        dbm.configure(database);
    }
}
