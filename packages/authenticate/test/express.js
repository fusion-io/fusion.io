const express = require('express');
const { authenticator } = require('../core');
const { createExpressGateway } = require('../gateways/jwt');

const app = express();

class IDP {
    async provide({token, payload}) {

        return payload;
    }
}

authenticator.register('jwt', createExpressGateway('jqe4NXz9URcCnbC5ew2Qm5iEKd10GepL', new IDP()));

app.get('/', authenticator.guard('jwt'), (req, res) => {
    res.json(req.identity);
});

app.use((error, req, res, next) => {

    res.json({
        type: 'Error',
        message: error.message
    });

    throw error;
});

app.listen(3000);