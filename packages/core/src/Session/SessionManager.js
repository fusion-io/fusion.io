/**
 * Since storing data in session is likely a Key-Value store.
 * So using ES6 Map is a convenient implementation.
 *
 */
export default class SessionManager extends Map {

    constructor(serializer) {
        super();
        this.serializer = serializer;
    }

    static storable(payload) {
        if (payload === 0) {
            return true;
        }
        return !!payload;
    }

    /**
     *
     * @param entries
     */
    load(entries) {
        entries.forEach(entry => {

            const [key, value]          = entry;
            const { metadata, payload } = value;

            // Keep the entries values by specify the serializer
            this.set(key, payload, metadata, v => v);
        });

        return this;
    }

    /**
     * Store a data into session
     *
     * @param {string} key
     * @param {*} value
     * @param metadata
     * @param {Function} serializeFunction
     * @return {SessionManager}
     */
    set(key, value, metadata = {}, serializeFunction = null) {
        if ('string' !== typeof key) {
            throw new Error("E_SESSION: Key of the session must be a string");
        }

        if (!serializeFunction) {
            serializeFunction = v => this.serializer.serialize(key, v);
        }

        const payload = serializeFunction(value);

        if (!SessionManager.storable(payload)) {
            throw new Error("E_SESSION: Could not set falsy values: false, null, undefined, \'\', NaN");
        }

        return super.set(key, {metadata, payload});
    }

    /**
     * Wrapper for delete
     *
     * @param key
     */
    unset(key) {
        this.delete(key);
    }

    /**
     * Clear all of the session data
     */
    forget() {
        this.clear();
    }

    /**
     * Get a session value
     *
     * @param {string} key
     * @param {*} defaultIfNotExisted
     * @param {Function} deserializeFunction
     */
    get(key, defaultIfNotExisted = null, deserializeFunction = null) {
        if (!super.has(key)) {
            return defaultIfNotExisted;
        }

        let {metadata, payload} = super.get(key);

        if (metadata.flash) {
            this.delete(key);
        }

        if (!deserializeFunction) {
            deserializeFunction = v => this.serializer.deserialize(key, v);
        }

        return deserializeFunction(payload);
    }

    /**
     *
     * @param key
     * @param value
     * @param metadata
     * @param serializeFunction
     *
     */
    flash(key, value, metadata = {}, serializeFunction = null) {
        return this.set(key, value, {...metadata, flash: true}, serializeFunction);
    }

    /**
     * Serialize the session data
     */
    serialize() {
        return Array.from(this.entries());
    }
}
