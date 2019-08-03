/**
 * In most of the types of Policy, we can grant an Identity with
 * some permission.
 * If so, we called that type of Policy is a GrantablePolicy.
 *
 */
export type GrantablePolicy<Identity> = {

    /**
     * Grant permissions for an Identity.
     *
     * @param identity
     * @param permissions
     */
    grant(identity: Identity, permissions: string[]): Promise<void>
}

export type Policy<Identity> = {

    /**
     * Check if the given Identity have the permission
     *
     * @param identity
     * @param permission
     */
    check(identity: Identity, permission: string): Promise<boolean>

    /**
     * Get the list of granted permission of the given identity
     *
     * @param identity
     */
    granted(identity: Identity): Promise<string[]>
}
