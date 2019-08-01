/**
 * Shape of the validation function
 */
export declare type ValidationFunction = (value: any, ...args: any[]) => Promise<boolean>;
/**
 * A rule that can validate the data
 */
export default class Rule {
    private name;
    private validationFunction;
    private ruleArguments;
    /**
     *
     * @param name
     * @param validationFunction
     * @param ruleArguments
     */
    constructor(name: string, validationFunction: ValidationFunction, ruleArguments: any[]);
    /**
     * Get the rule name
     */
    getName(): string;
    /**
     * Get the rule arguments
     */
    getArguments(): any[];
    /**
     *
     * @param value
     */
    validate(value: any): Promise<boolean>;
    /**
     *
     */
    toJSON(): {
        name: string;
        arguments: any[];
    };
}
