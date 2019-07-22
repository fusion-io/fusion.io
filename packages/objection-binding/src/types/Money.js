import Money from "dinero.js";

export default {
    parseDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        json[key] = Money({amount: original[key]});
    },

    formatDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        json[key] = original[key].getAmount();
    },

    parseJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        json[key] = Money({amount: original[key]});
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        json[key] = original[key].getAmount();
    }
}
