import { Policy, AuthorizationContext } from "./Contracts";

/**
 * This Policy type can combine other policies into it.
 * So it can supports various ways to authorize an Identity with sophisticated logic.
 *
 */
export default class GroupedPolicy<Identity> implements Policy<Identity> {

    /**
     * List of policies that will be applied
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
    async check(context: AuthorizationContext<Identity>, permission: string) {
        const result = await Promise.all(this.policies.map(policy => policy.check(context, permission)));

        return result.reduce((attempt: boolean, current: boolean) => attempt || current, false);
    }

    /**
     * @inheritDoc
     *
     * @param context
     */
    async granted(context: AuthorizationContext<Identity>) {
        const grantedPermissions = await Promise.all(this.policies.map(policy => policy.granted(context)));

        return [...new Set(grantedPermissions.reduce((united: string[], granted: string[]) => [...united, ...granted], []))];
    };
}
