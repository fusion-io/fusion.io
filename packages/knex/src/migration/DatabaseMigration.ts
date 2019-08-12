import { SchemaBuilder } from "knex";

export default interface DatabaseMigration {
    up(schema: SchemaBuilder, ...args: any[]): Promise<void>
    down(schema: SchemaBuilder, ...args: any[]): Promise<void>
}
