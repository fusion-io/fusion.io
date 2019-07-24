import Rule, {ValidationFunction} from "./Rule";
import RuleSet from "./RuleSet";
import {singleton} from "@fusion.io/core";
import RuleSetMap, {RuleSetMapDefinition} from "./RuleSetMap";

/**
 * Error for this layer
 */
export class ValidatorError extends Error { }

/**
 * Validator Manager
 */
@singleton()
export default class Validator extends Map<string, ValidationFunction> {

    /**
     * Create a validate function with given validator name.
     *
     * @param name
     * @param args
     * @return {function(*=): *}
     */
    make(name: string, args: any[] = [])  {

        const validationFunction = this.get(name);

        if (!validationFunction) {
            throw new ValidatorError(`E_VALIDATOR: Validator [${name}] is not registered.`);
        }

        return new Rule(name, validationFunction, args);
    }

    /**
     * Compile a rule set by a given definition string
     * It should be like: validator1:arg1:arg2|validator2:arg1:arg2
     *
     * Ex: contains:foo|contains:bar|length:40
     *
     * @param definitionString
     */
    compile(definitionString: string) {
        const ruleDefinitions = definitionString.split('|');
        const ruleSet         = new RuleSet();

        ruleDefinitions.forEach(ruleDefinition => {
            const [ruleName, ...args] = ruleDefinition.split(':');
            ruleSet.set(ruleName, this.make(ruleName, args));
        });

        return ruleSet;
    }

    /**
     * Compile a POJO / Serialized Definition into a RuleSetMap
     *
     * @param definition
     */
    compileMap(definition: RuleSetMapDefinition) {

        const map = new RuleSetMap();

        for (let fieldName in definition) {
            if (definition.hasOwnProperty(fieldName)) {
                map.set(fieldName, this.compile(definition[fieldName]));
            }
        }

        return map;
    }

    /**
     * Register a new Rule
     *
     * @param name
     * @param validationFunction
     */
    register(name: string, validationFunction: ValidationFunction) {

        this.set(name, validationFunction);

        return this;
    }
}
