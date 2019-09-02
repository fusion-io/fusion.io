export type parsedResult = {
    method: string,
    parameters: any[]
}

/**
 * An utility to parse a string like: "foo:bar:hello="world",x=3"
 * into { method: "foo", parameters: [ "bar", { "hello": "world", "x": 3 }] }
 *
 * It is useful for working with string-based configuration, search query,
 * validation settings, ...
 *
 */
export class ParametersExpression {

    /**
     * Parse a definition string
     *
     * @param definitionString
     */
    static parse(definitionString: string): parsedResult {
        const [method, ...parameterized] = definitionString.split(':');

        const parameters = parameterized.map(expression => {
            return expression.includes('=') ? this.parseHash(expression) : this.parseValue(expression)
        });

        return {
            method,
            parameters
        }
    }

    /**
     * Parse a parameter definition string into a hash
     *
     * @param definitionString
     */
    static parseHash(definitionString: string) {
        const entries = definitionString.split(',');

        return entries.reduce((merged, entry) => {
            const [key, value] = entry.split('=');

            return {
                ...merged,
                [key]: this.parseValue(value)
            }
        }, { });
    }

    /**
     * Parse a value into JS-value
     *
     * @param value
     */
    static parseValue(value: string) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
}
