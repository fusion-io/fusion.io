import Money from "dinero.js";

export default {
    parseDatabase(json, original, key) {

        if (original[key + 'Amount'] === null || original[key + 'Amount'] === undefined) {
            return json[key] = null;
        }

        const amount    = original[key + 'Amount'];
        const precision = original[key + 'Precision'];
        const currency  = original[key + 'Currency'];

        json[key] = Money({amount, precision, currency});
    },

    formatDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return delete json[key];
        }

        const money = original[key];

        json[key + 'Amount']    = money.getAmount();
        json[key + 'Precision'] = money.getPrecision();
        json[key + 'Currency']  = money.getCurrency();

        delete json[key];
    },

    parseJson(json, original, key) {
        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        if ('number' === typeof original[key]) {
            return json[key] = Money({amount: original[key]});
        }

        const { amount, precision, currency } = original[key];

        json[key] = Money({amount, precision, currency});
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        delete json[key + 'Amount'];
        delete json[key + 'Precision'];
        delete json[key + 'Currency'];

        json[key] = original[key].toObject();
    }
}
