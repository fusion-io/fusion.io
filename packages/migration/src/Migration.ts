/**
 * Shape of a migration
 */
export interface Migration {

    /**
     * Running up
     */
    up(...args: any[]): Promise<void>

    /**
     * Running down
     */
    down(...args: any[]): Promise<void>
}
