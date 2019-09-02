import User from "../User";
import { AuthorizationContext, Policy } from "@fusion.io/proton";

export default class OwnerPolicy implements Policy<User> {

    async isOwner(user: User, post: string) {
        const postsByUser = await user.posts();
        return postsByUser.includes(post);
    }

    async check(context: AuthorizationContext<User>, permission: string) {

        context.authorization = {
            resource: `post.${context.params.postId}`,
            action: permission,
            byPolicy: 'owner'
        };

        if (permission === 'write' || permission === "publish") {
            return await this.isOwner(context.identity, context.params.postId);
        } else {
            return false;
        }
    }

    async granted(context: AuthorizationContext<User>) {
        return await this.isOwner(context.identity, context.params.postId) ? ['write', 'publish'] : [];
    }
}
