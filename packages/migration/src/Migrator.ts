import MigrationState from "./MigrationState";
import MigrationManager from "./MigrationManager";

export default class Migrator {

    /**
     *
     * @param state
     * @param manager
     */
    constructor(public state: MigrationState, public manager: MigrationManager) { }

    /**
     * Run the migration up with given step
     *
     * @param step
     */
    public async up(step: number = 1) {
        const diff       = await this.manager.diff(await this.state.list());
        const migrations = diff.slice(0, step);

        if (!migrations.length) {
            return [];
        }

        await this.state.commit(migrations, await this.manager.reduceUp(migrations));

        return migrations;
    }

    /**
     * Run the migration to make clean up to date with dirty
     *
     */
    public async latest() {
        const diff = await this.manager.diff(await this.state.list());

        if (!diff.length) return [];

        await this.state.commit(diff, await this.manager.reduceUp(diff));

        return diff;
    }

    /**
     * Run the migration down with given step
     *
     * @param step
     */
    public async down(step: number = 1) {
        const list       = (await this.state.list()).reverse();
        const migrations = list.slice(0, step);

        if (!migrations.length) {
            return [];
        }

        await this.state.rollback(migrations, await this.manager.reduceDown(migrations));

        return migrations;
    }

    /**
     * Reset the clean state back to the initial state
     *
     */
    public async reset() {
        const list = (await this.state.list()).reverse();

        if (!list.length) {
            return [];
        }

        await this.state.rollback(list, await this.manager.reduceDown(list));

        return list;
    }
}
