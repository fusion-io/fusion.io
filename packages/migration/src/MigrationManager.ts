import fs from "fs";
import moment from "moment";
import MigrationResolver from "./MigrationResolver";
import SimpleMigrationResolver from "./SimpleMigrationResolver";

/**
 * The migration manager. It will manage the migration files
 */
export default class MigrationManager {

    /**
     * The migration directory
     *
     * @param directory
     * @param resolver
     */
    constructor(private directory: string, private resolver: MigrationResolver = new SimpleMigrationResolver()) { }

    /**
     * Compare and get the differences between the given set of migrations,
     * and its current migration files.
     *
     * @param migrations
     */
    public async diff(migrations: string[]) {

        const dirents = fs.readdirSync(this.directory, { withFileTypes: true });

        return dirents
            .filter(dirent =>
                (!migrations.includes(dirent.name)) &&
                dirent.name.endsWith('.migration.js') &&
                (!dirent.isDirectory())
            )
            .map(dirent => dirent.name)
        ;
    }

    /**
     * Given a set of migrations, it can reduce the .up() methods
     * into one function.
     *
     * @param migrations
     */
    public reduceUp(migrations: string[]) {
        return async (...args: any[]) => {
            const migrationInstances = await Promise.all(
                migrations
                    .map(migration => this.resolver.resolve(this.directory + '/' + migration))
            );

            for (let i = 0; i < migrationInstances.length; i++) {
                await migrationInstances[i].up(...args);
            }
        }
    }

    /**
     * Same as the .reduceUp() but using the .down() methods
     *
     * @param migrations
     */
    public reduceDown(migrations: string[]) {
        return async (...args: any[]) => {
            const migrationInstances = await Promise.all(
                migrations
                    .map(migration => this.resolver.resolve(this.directory + '/' + migration))
            );

            for (let i = 0; i < migrationInstances.length; i++) {
                await migrationInstances[i].down(...args);
            }
        }
    }

    /**
     * Generate a migration file with a given comment and migration template.
     *
     * @param comment
     */
    async create(comment: string) {
        const filename  =
            this.directory + '/' +
            moment.utc().format('YYYYMMDD_HHmmss') + '_' + comment + '.migration.js'
        ;

        fs.writeFileSync(filename, await this.resolver.generateSource(comment));
    }
}
