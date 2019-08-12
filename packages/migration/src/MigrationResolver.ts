import { Migration } from "./Migration";

/**
 * By implementing this resolver, the consumer code
 * can control the migration source code easier.
 *
 * This will enable them to do something like:
 *
 *  - Custom migration template
 *  - Database transaction
 *  - Supporting various pre-compilers: Typescript, Babel...
 *  - Supporting framework integrations: Dependency injection, test environment preparation.
 *  ...
 *
 */
export default interface MigrationResolver {

    /**
     * Generates the migration source code
     * from the given migration comment
     *
     */
    generateSource(comment: string): Promise<string>

    /**
     * Resolves a migration instance from given file
     *
     * @param file
     */
    resolve(file: string): Promise<Migration>
}
