import { IdentityProvider } from "../Contracts";

export type InstagramCredential = {
    access_token: string,
    user: string
}

export default class InstagramIDP implements IdentityProvider {
    async provide({access_token, user}: InstagramCredential) {

        return { access_token, profile: user };
    }
}
