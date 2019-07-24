import {container} from '@fusion.io/container';
import {Validator} from "../Contracts";

/**
 * A rule set, a chain of rules the will be applied to validate a value
 */
export default class RuleSet extends Map {

    /**
     * Validate a value with compiled rule set
     *
     * @param value
     * @return {Promise<{value: *, valid: boolean, valids: [], invalids: [], rules: []}>}
     */
    async validate(value) {

        const entries = Array.from(this.entries());
        const result  = await Promise.all(entries.map(async ([rule, validator]) => ({rule, args: validator.args, validator: validator.validator, valid: await validator(value)})));

        const valids   = result.filter(({rule, valid}) =>  valid).map(valided   => valided.rule);
        const invalids = result.filter(({rule, valid}) => !valid).map(invalided => invalided.rule);


        return { value, valid: invalids.length === 0, valids, invalids, rules: result };
    }

    /**
     * Compile (create) a rule set by a given definition string
     * It should be like: validator1:arg1:arg2|validator2:arg1:arg2
     *
     * Ex: contains:foo|contains:bar|length:40
     *
     * @param definitionString
     * @return {RuleSet}
     */
    static compile(definitionString) {
        const rules     = definitionString.split("|");
        const ruleSet   = new RuleSet();
        const validator = container.make(Validator);

        rules.forEach(rule => {
            let [ruleName, ...validatorArguments] = rule.split(':');

            ruleSet.set(rule, validator.make(ruleName, ...validatorArguments));
        });

        return ruleSet;
    }
}
