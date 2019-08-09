import {inject, Plasma as CorePlasma} from "@fusion.io/core";
import {Authorizer} from "./Authorizer";
import ACLConfigPolicy from "./ACLConfigPolicy";

export default class Plasma extends CorePlasma {

    @inject(Authorizer)
    compose(authorizer: Authorizer) {
        authorizer.supporting('acl', (options => new ACLConfigPolicy(options)))
    }

    @inject(Authorizer)
    boot(authorizer: Authorizer) {
        const config = this.config.authorization;
        authorizer.bootstrap(config)
    }
}
