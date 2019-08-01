import Rule from "./Rule";
/**
 * Shape of a the result of a rule
 */
export declare type RuleValidationResult = {
    rule: string;
    args: any[];
    valid: boolean;
};
/**
 * Shape of the result of a rule set
 */
export declare type RuleSetValidationResult = {
    /**
     * The value
     */
    value: any;
    /**
     * Validity status
     */
    valid: boolean;
    /**
     * List of Rules that the value was satisfy
     */
    valids: string[];
    /**
     * List of Rules that the value was not satisfy
     */
    invalids: string[];
    /**
     * List of the rules, and its validity status
     */
    rules: RuleValidationResult[];
};
/**
 * A rule set, a chain of rules the will be applied to validate a value
 */
export default class RuleSet extends Map<string, Rule> {
    /**
     * Validate a value
     *
     * @param value
     */
    validate(value: any): Promise<RuleSetValidationResult>;
    /**
     * Serialize this rule into the Definition string.
     */
    serialize(): string;
    /**
     * Alias of serialize()
     *
     */
    toString(): string;
    /**
     * Alias of serialize()
     *
     */
    strigify(): string;
}
