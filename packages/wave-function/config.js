module.exports = {

    debug: true,

    keys: [ 'some-secret-key' ],

    services: {
        // TODO
    },

    publisher: {
        default: 'local',
        adapters: {
            local: {
                driver: 'local'
            }
        }
    },

    subscriber: {
        default: 'local',
        adapters: {
            local: {
                driver: 'local'
            }
        }
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

        default: 'post',

        policies: {

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
                connection: __dirname + '/database/db.sqlite',
                useNullAsDefault: true
            }
        },
        migration: {
            directory: __dirname + '/database/migrations'
        },
        seeder: {
            directory: __dirname + '/database/seeders'
        }
    },

    view: {
        directory: __dirname + '/views'
    }
};
