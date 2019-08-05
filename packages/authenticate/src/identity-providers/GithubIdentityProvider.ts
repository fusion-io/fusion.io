import { IdentityProvider } from "../Contracts";

export type GithubCredential = {
    access_token: string
};

export default class GithubIdentityProvider implements IdentityProvider {
    constructor(private readonly ua: string) { }

    async provide({access_token}: GithubCredential) {
        const axios    = require('axios');
        const { data } = await axios.get(`https://api.github.com/user?access_token=${access_token}`);

        return { access_token, data };
    }
}
