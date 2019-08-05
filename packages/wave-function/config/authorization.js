module.exports =  {
    default: 'user',
    policies: {
        posts: {
            policy: 'acl.config',
            options: {
                guest: ['read'],
                user: ['read', 'comment', 'share', 'like'],
                admin: ['edit', 'publish']
            }
        },

    }
};
