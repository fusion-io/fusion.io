import moment from "moment";

export default {
    parseDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = moment(original[key]);
    },

    formatDatabase(json, original, key) {

        if (!original.hasOwnProperty(key)) {
            return;
        }

        if (original[key] === null) {
            return json[key] = null;
        }

        // Since it is not warranty that the original value is a moment() object
        // We'll try to wrap it first.
        return json[key] = moment(original[key]).toDate();
    },

    parseJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = moment(original[key]);
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = moment(original[key]).toDate().toISOString();
    }
}
