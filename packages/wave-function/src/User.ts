import { HavingRoles, Identity } from "@fusion.io/proton";

export default class User implements HavingRoles, Identity {

    constructor(private payload: { roles: any }) { }

    getRoles() {
        if ('string' === typeof this.payload.roles) {
            return [this.payload.roles];
        }

        if (this.payload.roles instanceof Array) {
            return this.payload.roles;
        }

        return [];
    }
}
