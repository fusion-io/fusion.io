import { Manager } from "@fusion.io/core";
import { Policy } from "./Contracts";

export class Authorizer extends Manager<Policy<any>> {

    public policy(policy?: string) {
        return this.adapter(policy);
    }

    public can(identity: any, action: string, byPolicy?: string) {
        return this.policy(byPolicy).check(identity, action);
    }

    public granted(identity: any, byPolicy?: string) {
        return this.policy(byPolicy).granted(identity);
    }

    public appliedPolicies(identity: any) {
        // TODO heavy task here
    }
}
