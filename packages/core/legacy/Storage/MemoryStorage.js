import lodash from "lodash";

export default class MemoryStorage {

    constructor() {
        this.internalStore = new Map();
    }

    /**
     *
     * @param key
     * @param value
     * @param {{tags: array|string, ttl: number} | *} options . ttl (seconds)
     * @return {Promise<void>}
     */
    async store(key, value, options = {}) {
        let tags        = options.tags || [];
        let ttl         = options.ttl  || 0;
        let savedAt     = Date.now();

        if (!lodash.isArray(tags)) {
            tags = [tags];
        }

        this.internalStore.set(key, {value, tags, savedAt, ttl});
    }

    /**
     * Update the item with the new timestamp.
     *
     * @param key
     * @return {Promise<null>}
     */
    async touch(key) {
        const result = this.internalStore.get(key);

        if (!result) {
            return null;
        }

        if (MemoryStorage.expired(result)) {
            return null;
        }

        this.internalStore.set(key, {...result, savedAt: Date.now()});
    }

    /**
     *
     * @param key
     * @return {Promise<*>}
     */
    async get(key) {
        const result = this.internalStore.get(key);

        if (!result) {
            return null;
        }

        if (MemoryStorage.expired(result)) {
            return null;
        }

        return {key, value: result.value};
    }

    /**
     *
     * @param key
     * @return {Promise<void>}
     */
    async remove(key) {
        this.internalStore.delete(key);
    }

    /**
     *
     * @return {Promise<void>}
     */
    async flush() {
        this.internalStore.clear();
    }

    /**
     *
     * @return {Promise<MemoryStorage>}
     */
    async cleanUp() {
        this.internalStore.forEach((item, key) => {
            if (MemoryStorage.expired(item)) {
                this.internalStore.delete(key)
            }
        });

        return this;
    }

    /**
     *
     * @param tag
     * @return {Promise<Array>}
     */
    async getByTag(tag) {
        let items = [];
        this.internalStore.forEach((item, key) => {
            if (item.tags.includes(tag) && !MemoryStorage.expired(item)) {
                items.push({value: item.value, key});
            }
        });


        return items;
    }

    /**
     *
     * @param savedAt
     * @param ttl
     * @return {boolean}
     */
    static expired({savedAt, ttl}) {
        if (ttl <= 0) {
            return false;
        }
        return Date.now() > (savedAt + ttl);
    }

    /**
     *
     * @return {MemoryStorage}
     */
    static install() {
        return new MemoryStorage();
    }
}
