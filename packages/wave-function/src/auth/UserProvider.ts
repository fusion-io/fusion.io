import {IdentityProvider, singleton} from "@fusion.io/proton";
import User from "../http/User";

@singleton()
export default class UserProvider implements IdentityProvider {
    async provide({ payload }: any) {
        return new User(payload)
    }
}
