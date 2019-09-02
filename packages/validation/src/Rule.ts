/**
 * Shape of the validation function
 */
export type ValidationFunction = (value: any, ...args: any[]) => Promise<boolean>;

/**
 * A rule that can validate the data
 */
export default class Rule {

    /**
     *
     * @param name
     * @param validationFunction
     * @param ruleArguments
     */
    constructor(
        private name: string,
        private validationFunction: ValidationFunction,
        private ruleArguments: any[]
    ) { }

    /**
     * Get the rule name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Get the rule arguments
     */
    getArguments(): any[] {
        return this.ruleArguments;
    }

    /**
     *
     * @param value
     * @param context
     */
    async validate(value: any, context: any) {
        return await this.validationFunction(value, ...this.ruleArguments, context);
    }

    /**
     *
     */
    toJSON() {
        return {
            name        : this.name,
            arguments   : this.ruleArguments
        }
    }
}
