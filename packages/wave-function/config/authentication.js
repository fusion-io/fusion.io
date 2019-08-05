module.exports = {
    default: 'facebook.user',
    gateways: {
        "facebook.user": {
            gateway: 'facebook',
            options: {
                protocol: {
                    clientId: process.env.FACEBOOK_CLIENT_ID,
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    redirectUri: 'http://localhost:2512/facebook/callback',
                    authorizePath: 'https://graph.facebook.com/oauth/authorize',
                    tokenPath: 'https://graph.facebook.com/oauth/access_token'
                },
                idp: {
                    graphAPIVersion: '3.3'
                }
            }
        },
        "jwt.client-app": {
            gateway: 'jwt',
            options: {
                privateKey: process.env.JWT_PRIVATE_KEY
            }
        }
    }
};
