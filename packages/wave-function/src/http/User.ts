import { HavingRoles, Identity } from "@fusion.io/proton";

export default class User implements HavingRoles, Identity {

    constructor(private payload: { roles: string[]|string }) { }

    getRoles() {
        return ('string' === typeof this.payload.roles) ? [this.payload.roles] : this.payload.roles;
    }
}
