module.exports = {

    debug: true,

    keys: [ ],

    services: {
        // TODO
    },

    authentication: {
        gateways: {
            "session.users": {
                protocol: 'proton.session'
            },
            "jwt.users": {
                protocol: "proton.token",
                options: {
                    privateKey: 'qwertyuiopasdfghjklzxcvbnm123456'
                }
            }
        }
    },

    authorization: {

        default: 'message',

        policies: {
            message: {
                policy: "acl",
                options: {
                    "admin": [ "view", "edit", "remove" ],
                    "owner": [ "edit" ],
                    "user": [ "view", "create" ]
                }
            },

            post: {
                policy: "acl",
                options: {
                    "user": [ "view", "share" ],
                    "guest": [ "view" ]
                }
            },

            media: {
                policy: "group",
                options: {
                    policies: [ 'message', 'post' ]
                }
            },

            // @@
            crazy: {
                policy: "composed",
                options: ({ combine, group }) => group(combine('media', 'post'), 'message')
            }
        }
    },

    locale: {
        default: '',
        presets: {

        }
    },

    database: {
        default: 'fusion',
        connections: {
            fusion: {
                client: 'sqlite3',
                connection: __dirname + '/db.sqlite',
                useNullAsDefault: true
            }
        },
        migration: {
            directory: __dirname + '/migrations'
        }
    },

    view: 'views'
};
