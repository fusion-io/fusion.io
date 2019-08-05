import { IdentityProvider } from "../Contracts";
import UnAuthenticated from "../UnAuthenticated";

export type GoogleCredential = {
    access_token: string,
    id_token: string
}

export default class GoogleIdentityProvider implements IdentityProvider {
    constructor(private readonly clientSecret: string) { }

    async provide({access_token, id_token}: GoogleCredential) {
        const jwt = require("jsonwebtoken");

        try {
            const profile = jwt.decode(id_token, ( this.clientSecret ));

            return { access_token, id_token, profile };
        } catch (error) {
            throw new UnAuthenticated(`Invalid id token. Reason: ${error.message}`);
        }
    }
}
