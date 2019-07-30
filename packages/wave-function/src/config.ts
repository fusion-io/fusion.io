import winston from "winston";

export default {
    debug: true,
    services: {
        pubnub: {
            publishKey: "pub-c-9b3aaf95-e915-42e1-8db4-18ec7b67269e",
            subscribeKey: "sub-c-e15be580-4479-11e8-8bb7-3ab51ec5ed79"
        }
    },
    database: {
        default: "sqlite",
        adapters: {
            sqlite: {
                options: {
                    client: "sqlite3",
                    connection: __dirname + "/../storage/db.sqlite",
                    useNullAsDefault: true
                }
            }
        }
    },
    logger: {
        level: 'info',
        format: winston.format.simple(),
        defaultMeta: { service: 'fusion.proton' },
        transports: [
            new winston.transports.File({ filename: __dirname + '/../storage/logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: __dirname + '/../storage/logs/combined.log' })
        ]
    },
    http: {
        keys: []
    },
    hub: {
        default: "pubnub",

        adapters: {
            local: {
                driver: "local"
            },
            pubnub: {
                driver: "pubnub",
                options: {
                    channel: "fusion"
                }
            }
        }
    }
}
