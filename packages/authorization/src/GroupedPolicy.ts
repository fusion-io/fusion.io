import { Policy } from "./Contracts";

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
     * @param identity
     * @param permission
     */
    async check(identity: any, permission: string) {
        const result = await Promise.all(this.policies.map(policy => policy.check(identity, permission)));

        return result.reduce((attempt: boolean, current: boolean) => attempt || current, false);
    }

    /**
     * @inheritDoc
     *
     * @param identity
     */
    async granted(identity: any) {
        const grantedPermissions = await Promise.all(this.policies.map(policy => policy.granted(identity)));

        return [...new Set(grantedPermissions.reduce((united: string[], granted: string[]) => [...united, ...granted], []))];
    };
}
