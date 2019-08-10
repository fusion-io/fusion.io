module.exports = {

    debug: true,

    keys: [ ],

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
                    "admin": [
                        'view', 'grant', 'block'
                    ],
                    "moderator": [
                        "view", "edit"
                    ]
                }
            }
        }
    },

    locale: {
        default: '',
        presets: {

        }
    },

    database: {
        default: '',
        connections: {

        }
    },

    view: 'views'
};
