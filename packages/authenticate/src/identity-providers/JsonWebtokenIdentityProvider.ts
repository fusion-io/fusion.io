import { IdentityProvider } from "../Contracts";
import UnAuthenticated from "../UnAuthenticated";

export type JWTCredential = { token: string };

export default class JWTIdentityProvider implements IdentityProvider {

    constructor(private readonly privateKey: string) { }

    async provide({token}: JWTCredential) {
        const jwt = require('jsonwebtoken');

        try {
            const payload = await jwt.decode(token, this.privateKey);
            return {token, payload};
        } catch (e) {
            throw new UnAuthenticated(`JWT Signature invalid. Reason: ${e}`);
        }
    }
}
