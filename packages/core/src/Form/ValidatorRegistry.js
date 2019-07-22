import lodash from "lodash";

/**
 *
 */
export default class ValidatorRegistry extends Map {

    /**
     * Create a validate function with given validator name.
     *
     * @param name
     * @param args
     * @return {function(*=): *}
     */
    make(name, ...args) {
        if (!this.has(name)) {
            throw new Error(`E_VALIDATOR: Validator [${name}] is not registered.`);
        }

        const validator = this.get(name);
        const wrapper   = value => validator(value, ...args);

        wrapper.args      = args;
        wrapper.validator = name;

        return wrapper;
    }

    /**
     * Register a validator with name.
     *
     * @param name
     * @param validator
     * @return {ValidatorRegistry}
     */
    register(name, validator) {

        if (lodash.isFunction(validator.validate)) {
            this.set(name, (...args) => validator.validate(...args));

            return this;
        }

        this.set(name, (...args) => validator(...args));

        return this;
    }
}
