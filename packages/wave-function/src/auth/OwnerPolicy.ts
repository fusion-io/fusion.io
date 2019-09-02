import { ContextAwarePolicy } from "@fusion.io/proton";
import User from "../User";

export default class OwnerPolicy extends ContextAwarePolicy<User> {

    async check(identity: User, permission: string) {

        this.getContext().authorization = {
            resource: `post.${this.getContext().params.postId}`,
            action: permission,
            byPolicy: 'owner'
        };

        const postsByUser = await identity.posts();

        if (permission === 'write' || permission === "publish") {
            return postsByUser.includes(this.getContext().params.postId)
        } else {
            return false;
        }
    }

    async granted(identity: User) {
        return []
    }
}
