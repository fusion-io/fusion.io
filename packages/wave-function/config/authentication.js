module.exports = {
    default: 'facebook',
    gateways: {
        facebook: {
            gateway: 'facebook',
            options: {
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                redirectUri: 'http://localhost:2512/facebook/callback'
            }

        },
        jwt: {
            gateway: 'jwt',
            options: {
                privateKey: process.env.JWT_PRIVATE_KEY
            }
        }
    }
};
