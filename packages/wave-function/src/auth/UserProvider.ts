import { IdentityProvider } from "@fusion.io/proton";
import User from "../http/User";

export default class UserProvider implements IdentityProvider {
    async provide({ payload }: any) {
        return new User(payload)
    }
}
