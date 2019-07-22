/**
 * An adapter for koa-session store which is bridged to our Storage service
 */
export default class StorageBridgeSessionStore {

    constructor(storage) {
        this.storage = storage;
    }

    async get(key) {
        return await this.storage.get(StorageBridgeSessionStore.resolveStorageKey(key), {});
    }

    async set(key, sess, maxAge, {rolling, changed}) {
        if (changed) {
            await this.storage.store(StorageBridgeSessionStore.resolveStorageKey(key), sess, {ttl: maxAge});
        }

        if (rolling) {
            await this.storage.touch(StorageBridgeSessionStore.resolveStorageKey(key));
        }

        return sess;
    }

    async destroy(key) {
        await this.storage.remove(StorageBridgeSessionStore.resolveStorageKey(key));
    }

    static resolveStorageKey(key) {
        return `fusion--session--${key}`;
    }
}
