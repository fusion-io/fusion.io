import {IdentityProvider} from "../Contracts";

export type SlackCredential = {
    access_token: string,
    user: any,
    team: any
}

export default class SlackIdentityProvider implements IdentityProvider {
    async provide({ access_token, user, team }: SlackCredential) {
        return { access_token, profile: user,  team } ;
    }
}
