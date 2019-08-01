import Rule, { ValidationFunction } from "./Rule";
import RuleSet from "./RuleSet";
import RuleSetMap, { RuleSetMapDefinition } from "./RuleSetMap";
/**
 * Error for this layer
 */
export declare class ValidatorError extends Error {
}
/**
 * Validator Manager
 */
export default class Validator extends Map<string, ValidationFunction> {
    /**
     * Create a validate function with given validator name.
     *
     * @param name
     * @param args
     * @return {function(*=): *}
     */
    make(name: string, args?: any[]): Rule;
    /**
     * Compile a rule set by a given definition string
     * It should be like: validator1:arg1:arg2|validator2:arg1:arg2
     *
     * Ex: contains:foo|contains:bar|length:40
     *
     * @param definitionString
     */
    compile(definitionString: string): RuleSet;
    /**
     * Compile a POJO / Serialized Definition into a RuleSetMap
     *
     * @param definition
     */
    compileMap(definition: RuleSetMapDefinition): RuleSetMap;
    /**
     * Register a new Rule
     *
     * @param name
     * @param validationFunction
     */
    register(name: string, validationFunction: ValidationFunction): this;
}
