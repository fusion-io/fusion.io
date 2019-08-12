import { MigrationError, MigrationState } from "@fusion.io/migration";
import * as Knex  from "knex";

/**
 * Will store the migration states in the database.
 *
 */
export default class DatabaseMigrationState implements MigrationState {

    /**
     *
     * @param connection
     * @param table
     */
    constructor(private connection: Knex, private table: string) { }

    /**
     * Change the connection
     *
     * @param connection
     */
    setConnection(connection: Knex) {
        this.connection = connection;

        return this;
    }

    /**
     * @inheritDoc
     *
     * @param migrations
     * @param migrate
     */
    async commit(migrations: string[], migrate: Function) {
        return this.connection.transaction(async trx => {
            await migrate(trx.schema);

            const records = migrations.map(migration => ({ migration, run_at: new Date() }));

            await trx.from(this.table).insert(records);
        });
    }

    /**
     * @inheritDoc
     *
     */
    async list() {
        return (await this
            .connection
            .table(this.table)
            .select('migration')
            .orderBy('migration'))
            .map(record => record.migration)
        ;
    }

    /**
     * @inheritDoc
     *
     */
    async prepare() {
        if (await this.connection.schema.hasTable(this.table)) {
            throw new MigrationError(`The migration table [${this.table}] already existed.` +
                ` Perhaps you already initialized the migration`)
            ;
        }

        await this.connection.schema.createTable(this.table, (tableBuilder => {
            tableBuilder.increments('id');
            tableBuilder.string('migration').unique('migration_name_unique');
            tableBuilder.timestamp('run_at');
        }));
    }

    /**
     * @inheritDoc
     *
     * @param migrations
     * @param migrate
     */
    async rollback(migrations: string[], migrate: Function): Promise<void> {
        return this.connection.transaction(async trx => {
            await migrate(trx.schema);
            await trx.from(this.table).delete().whereIn('migration', migrations);
        });
    }
}
