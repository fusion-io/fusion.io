import fs from "fs";
import MigrationState from "./MigrationState";
import MigrationError from "./MigrationError";

/**
 * The default supported state.
 * It will save the current state into the file system
 *
 */
export default class FilesystemState implements MigrationState {

    /**
     * The file that this state will used to store
     * the state
     *
     * @param file
     */
    constructor(private file: string) { }

    /**
     * @inheritDoc
     *
     */
    async prepare() {
        if (fs.existsSync(this.file)) {
            throw new MigrationError("Already initialized the migration state");
        }

        fs.writeFileSync(this.file, '[]');
    }

    /**
     * @inheritDoc
     *
     * @param migrations
     * @param migrate
     */
    async commit(migrations: string[], migrate: Function) {
        await migrate();
        const list = await this.list();

        fs.writeFileSync(this.file, JSON.stringify(list.concat(migrations)));
    }

    /**
     * @inheritDoc
     *
     */
    async list() {
        return (JSON.parse(fs.readFileSync(this.file).toString()) as string[]);
    }

    /**
     * @inheritDoc
     *
     */
    async rollback(migrations: string[], migrate: Function) {
        let list = await this.list();
        let left = list.filter(item => !migrations.includes(item));

        await migrate();
        fs.writeFileSync(this.file, JSON.stringify(left));
    }
}
