import { HavingRoles, Identity } from "@fusion.io/proton";

export default class User implements HavingRoles, Identity {

    constructor(private payload: { roles: any }) { }

    getRoles() {
        return ['user'];
    }

    name() {
        return 'rikky';
    }

    identity() {
        return this.name();
    }

    async posts() {
        return [
            'foo',
            'bar'
        ]
    }
}
