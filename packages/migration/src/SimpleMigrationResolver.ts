import MigrationResolver from "./MigrationResolver";
import fs from "fs";

/**
 * The simplest migration resolver
 */
export default class SimpleMigrationResolver implements MigrationResolver {

    /**
     * @inheritDoc
     *
     */
    async generateSource(comment: string) {
        return fs.readFileSync(__dirname + '/../Migration.template').toString();
    }

    /**
     * @inheritDoc
     *
     */
    async resolve(file: string) {
        return require(file);
    }
}
