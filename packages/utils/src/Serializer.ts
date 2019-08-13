type C = { new(...args:any[]): any };

type DeserializerFunction = (raw: string) => Promise<any>;

type SerializeFunction = (object: any) => Promise<string>;

type Strategy = {
    serialize: SerializeFunction,
    deserialize: DeserializerFunction
}

export class SerializerError extends Error { }

/**
 * Utility for serialize/deserialize objects with a given type.
 * This utility will be useful when dealing with data storage and message services.
 *
 */
export class Serializer {

    /**
     * List of strategies
     */
    private strategies = new Map<C, Strategy>();

    /**
     * Register a new strategy
     *
     * @param constructor
     * @param strategy
     */
    register(constructor: C, strategy: Strategy) {

        if (this.strategies.has(constructor)) {
            throw new SerializerError(`Strategy for constructor [${constructor.name}] already registered`);
        }

        this.strategies.set(constructor, strategy);

        return this;
    }

    /**
     * Get a strategy
     *
     * @param constructor
     */
    getOrFail(constructor: C) {

        const strategy  = this.strategies.get(constructor);

        if (strategy === undefined) {
            throw new SerializerError(`No strategy found for constructor [${constructor.name}]`);
        }

        return strategy;
    }

    /**
     * Serialize an object with the given strategy
     *
     * @param constructor
     * @param object
     */
    serialize(constructor: C, object: any) {
        return this.getOrFail(constructor).serialize(object);
    }

    /**
     * Deserialize the raw and get back
     * the object
     *
     * @param constructor
     * @param raw
     */
    deserialize<T>(constructor: { new(...args: any[]): T }, raw: string): Promise<T> {
        return this.getOrFail(constructor).deserialize(raw);
    }
}

/**
 * The global serializer
 *
 */
export const serializer = new Serializer();

/**
 * Decorator for adding a strategy
 *
 * @param strategy
 */
export const serializable = (strategy: Strategy) => (Target: C) => {
    serializer.register(Target, strategy);
};
