import { AuthorizationContext, Policy } from "./Contracts";

/**
 * A CombinedPolicy is a policy type that will check 2 or more
 * policies with AND logic.
 *
 * If one of them was failed on checking, the final result will
 * also fail
 *
 */
export default class CombinedPolicy<Identity> implements Policy<Identity> {

    /**
     *
     * @param policies
     */
    constructor(private policies: Policy<Identity>[]) { }

    /**
     * @inheritDoc
     *
     * @param context
     * @param permission
     */
    async check(context : AuthorizationContext<Identity>, permission: string) {
        const result = await Promise.all(this.policies.map(policy => policy.check(context, permission)));
        return result.reduce((attempt: boolean, current: boolean) => attempt && current, true);
    }

    /**
     * @inheritDoc
     *
     * @param identity
     */
    async granted(identity: Identity) {
        let grantedPermissions = await Promise.all(this.policies.map(policy => policy.granted(identity)));
        let firstPermissionSet = grantedPermissions.shift();

        if (!firstPermissionSet) {
            return [];
        }

        return grantedPermissions.reduce(
            (intersectionPermissions, currentPermissions) =>
                currentPermissions.filter(permission => currentPermissions.includes(permission)),
            firstPermissionSet
        )
    };
}
