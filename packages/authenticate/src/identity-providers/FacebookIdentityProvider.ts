import { IdentityProvider } from "../Contracts";

export type FacebookCredential = {
    access_token: string
};

export default class FacebookIdentityProvider implements IdentityProvider {

    constructor(private readonly graphAPIVersion = '3.3') { }

    public async provide({access_token}: FacebookCredential) {
        const axios    = require('axios');
        const { data } = await axios.get(`https://graph.facebook.com/v${this.graphAPIVersion}/me?access_token=${access_token}`);

        return { access_token, profile: data };
    }
}
