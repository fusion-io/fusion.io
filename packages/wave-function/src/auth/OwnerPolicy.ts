import User from "../User";
import { AuthorizationContext, Policy } from "@fusion.io/proton";

export default class OwnerPolicy implements Policy<User> {

    async check(context: AuthorizationContext<User>, permission: string) {

        context.authorization = {
            resource: `post.${context.params.postId}`,
            action: permission,
            byPolicy: 'owner'
        };

        const postsByUser = await context.identity.posts();

        if (permission === 'write' || permission === "publish") {
            return postsByUser.includes(context.params.postId)
        } else {
            return false;
        }
    }

    async granted(identity: User) {
        return []
    }
}
