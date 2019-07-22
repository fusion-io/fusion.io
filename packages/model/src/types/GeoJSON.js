import {Primitive} from "terraformer";

// @see http://terraformer.io

export default {
    parseDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = new Primitive(JSON.parse(original[key]));
    },

    formatDatabase(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = original[key].toJSON();
    },

    parseJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = new Primitive(JSON.parse(original[key]));
    },

    formatJson(json, original, key) {

        if (original[key] === null || original[key] === undefined) {
            return json[key] = null;
        }

        return json[key] = original[key].toJSON();
    }
}
