import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import { Authorizer } from "./Authorizer";
import ACLConfigPolicy from "./ACLConfigPolicy";
import GroupedPolicy from "./GroupedPolicy";
import CombinedPolicy from "./CombinedPolicy";
import ComposedPolicy, { ComposeFunction } from "./ComposedPolicy";

export default class Plasma extends CorePlasma {

    @inject(Authorizer)
    compose(authorizer: Authorizer) {
        authorizer
            .supporting('config', (options => {
                return new ACLConfigPolicy(options);
            }))

            .supporting('grouped', ({ policies }: { policies: string[] }) => {
                return new GroupedPolicy(policies.map(policy => authorizer.policy(policy)));
            })

            .supporting('combined', ({ policies }: { policies: string[]}) => {
                return new CombinedPolicy(policies.map(policy => authorizer.policy(policy)));
            })

            .supporting('composed', (composeFunction: ComposeFunction<any>) => {
                return new ComposedPolicy(composeFunction, authorizer);
            })
        ;
    }

    @inject(Authorizer)
    boot(authorizer: Authorizer) {
        const config = this.config.authorization;
        authorizer.bootstrap(config)
    }
}
