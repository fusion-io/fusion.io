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
            "post": {
                "driver": "grouped",
                "options": {
                    policies: [ "post.owner", "post.acl" ]
                }
            },
            "post.owner": {
                "driver": "owner"
            },
            "post.acl": {
                "driver": "config",
                "options": {
                    "user": ["read"],
                    "admin": ["read", "write"]
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

    validation: {

        adapters: {
            system: {
                driver: "ajv",
                options: {
                    schemas: {
                        foobar: {
                            type: "object",
                            required: [ "foo", "bar" ],
                            properties: {
                                foo: {
                                    type: "string"
                                },
                                bar: {
                                    type: "string"
                                }

                            }
                        }
                    },
                    allErrors: true
                }
            }
        }

    },

    view: {
        directory: __dirname + '/views'
    }
};
