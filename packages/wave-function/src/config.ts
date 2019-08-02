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
                driver: 'jwt'
            }
        }
    },

    locale: {
        default: 'international',

        adapters: {
            international: {
                driver: 'ldc',
                language: 'en-US'
            }
        }
    },

    services: {

        mqtt: {
            host: 'mqtt://test.mosquitto.org'
        },

        pubnub: {
            publishKey: "pub-c-9b3aaf95-e915-42e1-8db4-18ec7b67269e",
            subscribeKey: "sub-c-e15be580-4479-11e8-8bb7-3ab51ec5ed79"
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
