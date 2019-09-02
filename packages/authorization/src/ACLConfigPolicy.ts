import { AuthorizationContext, Policy } from "./Contracts";

/**
 * In this type of Policy, Permissions is just a list of strings
 */
type Permissions = string[];

/**
 * The ACL will be a hash of role - permissions
 *
 */
export type ACLConfiguration = {
    [role: string]: Permissions
}

/**
 * Shape of the Identity which will be authorized.
 * It must have a least .getRoles() method
 *
 */
export type HavingRoles = {
    getRoles(): string[]
}

/**
 * This type of Policy can authorize the identity as well as
 * a role (in form of a string)
 *
 */
export type ACLIdentityOrRole = HavingRoles | string;

/**
 * The Policy type.
 * Because this is a config based Policy type. It cannot grant permissions.
 *
 */
export default class ACLConfigPolicy implements Policy<ACLIdentityOrRole> {

    /**
     *
     * @param config
     */
    public constructor(private config: ACLConfiguration) { }

    /**
     *
     * @inheritDoc
     * @param context
     * @param permission
     */
    public async check({ identity }: AuthorizationContext<ACLIdentityOrRole>, permission: string) {

        let roles = ACLConfigPolicy.resolveRoles(identity);

        return roles.reduce(
            (allowing: boolean, role) => allowing || this.checkForRole(role, permission), false
        );
    }

    /**
     *
     * @param role
     * @param permission
     */
    private checkForRole(role: string, permission: string) {
        return this.config.hasOwnProperty(role) &&
            this.config[role].includes(permission)
        ;
    }

    /**
     *
     * @param authorizable
     */
    private static resolveRoles(authorizable: ACLIdentityOrRole) {
        return (typeof authorizable === "string") ?
            [ authorizable ] :
            (authorizable as HavingRoles).getRoles()
        ;
    }

    /**
     *
     * @param identityOrRole
     */
    async granted(identityOrRole: HavingRoles): Promise<Permissions> {

        const roles = ACLConfigPolicy.resolveRoles(identityOrRole);

        return roles
            .map(role => this.config.hasOwnProperty(role) ? this.config[role] : [])
            .reduce((merged, permissions) => merged.concat(permissions), [])
            .filter((x, i, a) => a.indexOf(x) == i)
        ;
    };
}
