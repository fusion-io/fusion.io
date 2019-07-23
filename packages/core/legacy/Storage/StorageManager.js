import Manager from "../utils/Manager";
import BlackHoleStorage from "./BlackHoleStorage";
import MemoryStorage from "./MemoryStorage";
import DatabaseStorage from "./DatabaseStorage";

/**
 * Manager of the storage adapters
 */
export default class StorageManager extends Manager {

    constructor({defaultAdapter, adapters}, serializer) {
        super();

        this.serializer     = serializer;
        this.defaultAdapter = defaultAdapter;
        this.adapterConfigs = adapters;

        // By default, we'll support 3 basic drivers only
        // other drivers will be supported when we develop the related package
        //     database, redis, memcached, mongodb
        this.drivers = {
            // "filesystem" : FileSystemStorage,
            'database'   : DatabaseStorage,
            "memory"     : MemoryStorage,
            "blackhole"  : BlackHoleStorage
        }
    }

    /**
     * Get the configuration of a given adapter
     *
     * @param adapterName
     * @return {*}
     */
    configOf(adapterName) {
        const adapterConfig = this.adapterConfigs[adapterName];

        if (!adapterConfig) {
            throw new Error(`E_STORAGE: Adapter ${adapterName} is not configured`);
        }

        return adapterConfig;
    }

    /**
     * @inheritDoc
     */
    getDefaultAdapterName() {
        return this.defaultAdapter;
    }

    /**
     * @inheritDoc
     */
    resolveDriver(adapterName) {

        const adapterConfig = this.configOf(adapterName);

        return adapterConfig['driver'];
    }

    /**
     *
     * @param key
     * @param value
     * @param serializer
     * @param opts
     * @return {Promise<void>}
     */
    async store(key, value, opts = {}, serializer = null) {
        let serializedValue = serializer ?
            await serializer(value, key) :
            await this.serializer.serialize(key, value, key)
        ;

        await this.adapter().store(key, JSON.stringify(serializedValue), opts);
    }

    /**
     *
     * @param key
     * @param valueIfNotExisted
     * @param deserializer
     * @return {Promise<void>}
     */
    async get(key, valueIfNotExisted = null, deserializer = null) {

        const serializedValue = await this.adapter().get(key);

        if (serializedValue === null) {
            return valueIfNotExisted;
        }

        return deserializer ?
            await deserializer(JSON.parse(serializedValue.value), key) :
            await this.serializer.deserialize(key, JSON.parse(serializedValue.value), key)
        ;
    }

    /**
     *
     * @param key
     * @return {Promise<void>}
     */
    async remove(key) {
        await this.adapter().remove(key);
    }

    /**
     *
     * @param tag
     * @param deserializer
     * @return {Promise<*>}
     */
    async getByTag(tag, deserializer = null) {
        if (!this.adapter().getByTag) {
            return [];
        }

        const taggedResults = await this.adapter().getByTag(tag);

        return await Promise
            .all(taggedResults.map(serializedResult => {

                return deserializer ?
                    deserializer(JSON.parse(serializedResult.value), serializedResult.key) :
                    this.serializer.deserialize(serializedResult.key, JSON.parse(serializedResult.value), serializedResult.key)
                ;
            }))
        ;
    }

    /**
     *
     * @param key
     * @return {Promise<void>}
     */
    async touch(key) {
        await this.adapter().touch(key);
    }

    /**
     * Here we can register our macro.
     * With this one, we can perform serialize/deserialize on a given key.
     *
     * @param key
     * @param serializeFunction
     * @param deserializeFunction
     * @return StorageManager
     */
    macro(key, serializeFunction, deserializeFunction) {
        this.serializer.register(key, serializeFunction, deserializeFunction);

        return this;
    }
}
