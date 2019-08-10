import { IdentityProvider } from "../Contracts";
import UnAuthenticated from "../UnAuthenticated";

export type JsonWebTokenCredential = { token: string };

export default class JebWebTokenIdentityProvider implements IdentityProvider {

    constructor(private readonly privateKey: string) { }

    async provide({token}: JsonWebTokenCredential) {
        const jwt = require('jsonwebtoken');

        try {
            const payload = jwt.verify(token, this.privateKey);
            return {token, payload};
        } catch (e) {
            throw new UnAuthenticated(`JWT Signature invalid. Reason: ${e}`);
        }
    }
}
