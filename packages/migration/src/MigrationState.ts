/**
 * The clean state of the Migration.
 */
export default interface MigrationState {

    /**
     * Preparing the initial state
     *
     */
    prepare(): Promise<void>

    /**
     * Commit changes to the state with given migrations
     *
     * @param migrations
     * @param migrate
     */
    commit(migrations: string[], migrate: Function): Promise<void>

    /**
     * Rollback change to the state with given migrations
     *
     * @param migrations
     * @param migrate
     */
    rollback(migrations: string[], migrate: Function): Promise<void>

    /**
     * Get all of the committed migrations
     *
     */
    list(): Promise<string[]>
}
