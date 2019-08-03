import Rule from "./Rule";

/**
 * Shape of a the result of a rule
 */
export type RuleValidationResult = {
    rule    : string,
    args    : any[],
    valid   : boolean
}

/**
 * Shape of the result of a rule set
 */
export type RuleSetValidationResult = {

    /**
     * The value
     */
    value       : any,

    /**
     * Validity status
     */
    valid       : boolean,

    /**
     * List of Rules that the value was satisfy
     */
    valids      : string[],

    /**
     * List of Rules that the value was not satisfy
     */
    invalids    : string[],

    /**
     * List of the rules, and its validity status
     */
    rules       : RuleValidationResult[]
}

/**
 * A rule set, a chain of rules the will be applied to validate a value
 */
export default class RuleSet extends Map<string, Rule> {

    /**
     * Validate a value
     *
     * @param value
     */
    async validate(value: any): Promise<RuleSetValidationResult> {

        const entries = Array.from(this.entries());
        const result  = await Promise.all(entries.map(async ([name, rule]: [string, Rule]) =>
            ({
                rule    : rule.getName(),
                args    : rule.getArguments(),
                valid   : await rule.validate(value)
            })));

        const valids   = result.filter(({rule, valid}) =>  valid).map(valided   => valided.rule);
        const invalids = result.filter(({rule, valid}) => !valid).map(invalided => invalided.rule);


        return { value, valid: invalids.length === 0, valids, invalids, rules: result };
    }

    /**
     * Serialize this rule into the Definition string.
     */
    serialize() {
        return Array.from(this.values())
            .map(rule => {
                const argumentsDefinitionString = rule.getArguments().length ? rule.getArguments().join(':') : '';
                return rule.getName() +
                    (rule.getArguments().length ? (`:` + argumentsDefinitionString) : '')
            }).join('|')
        ;
    }

    /**
     * Alias of serialize()
     *
     */
    toString() {
        return this.serialize()
    }

    /**
     * Alias of serialize()
     *
     */
    stringify() {
        return this.serialize();
    }
}
