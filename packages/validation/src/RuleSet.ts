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
        const result  = await Promise.all(entries.map(async ([name, rule]: [string, Rule]) => {
            let context = { };
            let valid   = await rule.validate(value, context);

            return ({
                rule    : rule.getName(),
                args    : rule.getArguments(),
                valid,
                context
            });
        }));


        const valids   = result.filter(({rule, valid}) =>  valid).map(valided   => valided.rule);
        const invalids = result.filter(({rule, valid}) => !valid).map(invalided => invalided.rule);

        return { value, valid: invalids.length === 0, valids, invalids, rules: result };
    }
}
