import lodash from "lodash";
import {container} from "@fusion.io/container";
import {Database} from "../Contracts";

export default class DatabaseStorage {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
        this.tableName  = 'fusion_storages';
        this.ttl        = 1000 * 60 * 60 * 24;
    }

    /**
     *
     * @param tableName
     * @return {DatabaseStorage}
     */
    setTable(tableName) {
        this.tableName = tableName;

        return this;
    }

    /**
     *
     * @param ttl
     * @return {DatabaseStorage}
     */
    setDefaultTTL(ttl) {
        this.ttl = ttl;

        return this;
    }

    /**
     *
     * @param tags
     * @return {string}
     */
    static buildTagFieldValue(tags) {
        return '|' + tags.join('|') + '|';
    }

    /**
     *
     * @param options
     * @return {*}
     */
    guessTTL(options) {
        if (!options.ttl) {
            return this.ttl;
        }

        if (options.ttl < 0) {
            return this.ttl;
        }

        return options.ttl;
    }

    /**
     *
     * @param key
     * @param value
     * @param {{value: string, tags: array|string, ttl: number}} options . ttl (seconds)
     * @return {Promise<void>}
     */
    async store(key, value, options = {}) {
        let tags        = options.tags || [];
        let ttl         = this.guessTTL(options);
        let now         = Date.now();
        let expiredAt   = now + ttl;

        if (!lodash.isArray(tags)) {
            tags = [tags];
        }

        const tagFieldValue = DatabaseStorage.buildTagFieldValue(tags);

        const isExisted = await this.connection
            .from(this.tableName)
            .where({key})
            .first()
        ;

        if (isExisted) {
            return await this.connection
                .update({value, tags: tagFieldValue, updatedAt: now, expiredAt, ttl})
                .where({key})
                .table(this.tableName)
            ;
        }

        await this.connection
            .insert({key, value, tags: tagFieldValue, createdAt: now, updatedAt: now, expiredAt, ttl})
            .into(this.tableName)
        ;
    }

    async touch(key) {
        const now = Date.now();
        await this.connection
            .where({key})
            .where('expiredAt', '>=', now)
            .update({
                updatedAt: now,
                expiredAt: this.connection.raw('?? + ??', [now, 'ttl'])
            })
            .table(this.tableName)
        ;
    }

    /**
     *
     * @param key
     * @return {Promise<*>}
     */
    async get(key) {

        let result = await this.connection
            .select()
            .table(this.tableName)
            .where({key})
            .where('expiredAt', '>=', Date.now())
            .orderBy('id', 'desc')
            .first()
        ;

        if (!result) {
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
        await this.connection.from(this.tableName).where({key}).delete();
    }

    /**
     *
     * @return {Promise<void>}
     */
    async flush() {
        await this.connection.truncate(this.tableName);
    }

    /**
     *
     * @return {Promise<MemoryStorage>}
     */
    async cleanUp() {
        await this.connection.from(this.tableName)
            .where('expiredAt', '<', Date.now())
            .delete()
        ;
    }

    /**
     *
     * @param tag
     * @return {Promise<Array>}
     */
    async getByTag(tag) {
        const resultSet = await this.connection
            .from(this.tableName)
            .select('*')
            .where('expiredAt', '>=', Date.now())
            .where('tags', 'like', `%|${tag}|%`)
            .from(this.tableName)
            .orderBy('id', 'desc')
        ;

        return resultSet.map(({key, value}) => ({key, value}));
    }

    /**
     *
     * @return {DatabaseStorage}
     */
    static install(adapterName, manager) {

        const {connection, tableName, ttl} = manager.configOf(adapterName);
        const dbm = container.make(Database);

        const adapter = new DatabaseStorage(dbm.connection(connection));

        if (tableName) {
            adapter.setTable(tableName);
        }

        if (ttl) {
            adapter.setDefaultTTL(ttl);
        }

        return adapter;
    }
}