import { ContextAwarePolicy } from "@fusion.io/proton";
import User from "../User";

export default class PostPolicy extends ContextAwarePolicy<User> {

    async check(identity: User, permission: string) {

        const postsByUser = await identity.posts();

        if(permission === 'read') {
            return true;
        } else if (permission === 'write') {
            return postsByUser.includes(this.getContext().params.postId)
        } else {
            return false;
        }
    }

    async granted(identity: User) {
        return []
    }
}
