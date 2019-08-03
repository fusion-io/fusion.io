export default {

    debug: true,

    keys: [ ],

    authentication: {
        default: 'facebook',
        adapters: {
            facebook: {
                driver: 'facebook',
                options: {
                    clientId: process.env.FACEBOOK_CLIENT_ID,
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    redirectUri: 'http://localhost:2512/facebook/callback'
                }

            },
            jwt: {
                driver: 'jwt',
                options: {
                    privateKey: process.env.JWT_PRIVATE_KEY
                }
            }
        }
    },

    authorization: {
        default: 'user',
        adapters: {
            posts: {
                driver: 'acl',
                options: {
                    guest: ['read'],
                    user: ['read', 'comment', 'share', 'like'],
                    admin: ['edit', 'publish']
                }
            },

        }
    },

    locale: {
        default: 'international',

        adapters: {
            international: {
                driver: 'ldc',
                options: {
                    language: 'en-US',
                    currency: 'dollar',
                    timeZone: 'utc',
                    dateTime: {
                        format: 'YYYY-mm-dd HH:MM:SS'
                    }
                }
            }
        }
    },

    services: {

        mqtt: {
            host: 'mqtt://test.mosquitto.org'
        },

        pubnub: {
            publishKey: process.env.PUBNUB_PUBLISH_KEY,
            subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY
        },

        i18next: {

        }
    },

    database: {
        default: "sqlite",
        adapters: {
            sqlite: {
                client: "sqlite3",
                connection: __dirname + "/../storage/db.sqlite",
                useNullAsDefault: true
            }
        }
    },

    view: "views"
}
