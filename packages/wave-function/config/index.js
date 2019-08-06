module.exports = {

    debug: true,

    keys: [ ],

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

    http: {
        port: 2512
    },

    authentication: require('./authentication'),

    authorization: require('./authorization'),

    locale: require('./locale'),

    database: require('./database'),

    view: "views"
};
