import { IdentityProvider, singleton } from "@fusion.io/proton";

@singleton()
export default class DummyUserProvider implements IdentityProvider {
    async provide({ access_token, profile }: { access_token: string, profile: any }) {
        return {
            ...profile,
            from: 'DummyIDP'
        };
    }
}
