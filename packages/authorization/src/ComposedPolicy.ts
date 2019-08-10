import { Policy } from "./Contracts";
import { Authorizer } from "./Authorizer";
import GroupedPolicy from "./GroupedPolicy";
import CombinedPolicy from "./CombinedPolicy";

/**
 * A composer signature
 */
export type Composer<Identity> = {
    combine: (...policies: string[]) => Policy<Identity>,
    group: (...policies: string[]) => Policy<Identity>,
}

/**
 * The ComposeFunction
 */
export type ComposeFunction<Identity> = (composer: Composer<Identity>) => Policy<Identity>

/**
 * Composed policy will execute the ComposeFunction and get back the composed
 * policy as result.
 *
 */
export default class ComposedPolicy<Identity> implements Policy<Identity> {

    /**
     * The composed policy
     *
     */
    private composedPolicy: Policy<Identity>;

    /**
     *
     * @param composeFunction
     * @param authorizer
     */
    constructor(composeFunction: ComposeFunction<Identity>, private authorizer: Authorizer) {
        this.composedPolicy = composeFunction({
            combine: (...policies: string[]) => this.combining(...policies),
            group: (...policies: string[]) => this.grouping(...policies)
        });
    }

    /**
     * The grouping will do the OR logic
     *
     * @param policies
     */
    private grouping(...policies: string[]) {
        return new GroupedPolicy(policies.map(policy => this.authorizer.policy(policy)))
    }

    /**
     * The combining will do the AND logic
     *
     * @param policies
     */
    private combining(...policies: string[]) {
        return new CombinedPolicy(policies.map(policy => this.authorizer.policy(policy)))
    }

    /**
     * @inheritDoc
     *
     * @param identity
     * @param permission
     */
    check(identity: Identity, permission: string) {
        return this.composedPolicy.check(identity, permission);
    }

    /**
     * @inheritDoc
     *
     * @param identity
     */
    granted(identity: Identity) {
        return this.composedPolicy.granted(identity);
    }
}
