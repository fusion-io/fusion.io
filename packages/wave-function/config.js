module.exports = {

    debug: true,

    keys: [ ],

    authentication: {
        gateways: {
            "token.users": {
                gateway: "jwt",
                options: {
                    privateKey: 'qwertyuiopasdfghjklzxcvbnm123456'
                }
            }
        }
    },

    authorization: {
        default: '',
        policies: {
            message: {
                policy: "acl",
                options: {
                    "Project Administrator": [
                        'view'
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
