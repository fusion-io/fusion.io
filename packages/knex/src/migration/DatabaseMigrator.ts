import { Migrator, MigrationManager } from "@fusion.io/migration";
import { tokamak } from "@fusion.io/core";
import DatabaseManager from "../DatabaseManager";
import DatabaseMigrationState from "./DatabaseMigrationState";
import DatabaseMigrationResolver from "./DatabaseMigrationResolver";

export default class DatabaseMigrator extends Migrator { }

tokamak.singleton(DatabaseMigrator, () => {

    const dbm = tokamak.make<DatabaseManager>(DatabaseManager);
    const { database: { migration: { directory, table } } } = tokamak.make('config');

    return new DatabaseMigrator(
        new DatabaseMigrationState(dbm.connection(), table || 'fusion_migrations'),
        new MigrationManager(directory, new DatabaseMigrationResolver())
    )
});
