import {Manager, singleton} from "@fusion.io/core";
import { Policy } from "./Contracts";
import UnAuthorized from "./UnAuthorized";

export type AuthorizerConfiguration = {
    default: string,
    policies: {
        [resource: string]: {
            policy: string,
            options: any
        }
    }
}

@singleton()
export class Authorizer extends Manager<Policy<any>> {

    /**
     *
     * @param config
     */
    bootstrap(config: AuthorizerConfiguration) {
        const standardAdapterConfig = Object.entries(config.policies).reduce((merged, [resource, { policy, options }]) => ({
            ...merged,
            [resource]: { driver: policy, options }
        }), {});

        this.configure({
            default: config.default,
            adapters: standardAdapterConfig
        })
    }

    /**
     * Alias of adapter
     *
     * @param policy
     */
    public policy(policy?: string) {
        return this.adapter(policy);
    }

    /**
     * Check if given identity can perform
     * an action by a given policy
     *
     * @param identity
     * @param action
     * @param byPolicy
     */
    public can(identity: any, action: string, byPolicy?: string) {
        return this.policy(byPolicy).check(identity, action);
    }

    /**
     * Check if given identity can perform
     * an action by a given policy.
     * If fail, will throw an UnAuthorized error
     *
     * @param identity
     * @param action
     * @param byPolicy
     */
    public async verify(identity: any, action: string, byPolicy?: string) {
        const accepted = await this.policy(byPolicy).check(identity, action);

        if (!accepted) {
            throw new UnAuthorized("UnAuthorized");
        }
    }

    /**
     * Get actions that an identity can
     * perform by given policy
     *
     * @param identity
     * @param byPolicy
     */
    public granted(identity: any, byPolicy?: string) {
        return this.policy(byPolicy).granted(identity);
    }
}
