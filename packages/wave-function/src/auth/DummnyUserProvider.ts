import {IdentityProvider} from "@fusion.io/authenticate";

export default class DummyUserProvider implements IdentityProvider {
    async provide({ access_token, profile }: { access_token: string, profile: any }) {
        return {
            ...profile,
            from: 'DummyIDP'
        };
    }
}
