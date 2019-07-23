export default class Serializer {

    /**
     *
     */
    constructor() {
        this.strategies = {};
    }

    /**
     *
     * @param strategyName
     * @param serializeFunction
     * @param deserializeFunction
     * @return {Serializer}
     */
    register(strategyName, serializeFunction, deserializeFunction) {

        if (this.strategies[strategyName]) {
            throw new Error(`E_SERIALIZER: We already registered a strategy named [${strategyName}]. Please use the different one.`);
        }

        this.strategies[strategyName] = { serializeFunction, deserializeFunction };

        return this;
    }

    /**
     *
     * @param strategyName
     * @param data
     * @return {*}
     */
    serialize(strategyName, ...data) {

        const strategy = this.getStrategy(strategyName);

        return strategy.serializeFunction(...data);
    }

    /**
     *
     * @param strategyName
     * @param serialized
     * @return {*}
     */
    deserialize(strategyName, ...serialized) {

        const strategy = this.getStrategy(strategyName);

        return strategy.deserializeFunction(...serialized);
    }

    /**
     *
     * @param strategyName
     * @return {*}
     */
    getStrategy(strategyName) {
        const strategy = this.strategies[strategyName];

        if (!strategy) {
            return {
                serializeFunction   : v => v,
                deserializeFunction : v => v
            }
        }

        return strategy;
    }

    /**
     *
     * @param strategyName
     */
    getStrategyOrThrow(strategyName) {
        const strategy = this.strategies[strategyName];

        if (!strategy) {
            throw new Error(`E_SERIALIZER: Strategy [${strategyName}] is not registered.`);
        }

        return strategy;
    }
}
