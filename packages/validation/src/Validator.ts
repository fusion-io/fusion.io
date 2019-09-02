import { Manager, singleton, ParametersExpression } from "@fusion.io/core";
import Rule, { ValidationFunction } from "./Rule";
import RuleSet from "./RuleSet";
import RuleSetMap, { RuleSetMapDefinition } from "./RuleSetMap";

/**
 * Validator Manager
 */
@singleton()
export default class Validator extends Manager<ValidationFunction> {

    /**
     * Create a validate function with given validator name.
     *
     * @param name
     * @param args
     * @return {function(*=): *}
     */
    make(name: string, args: any[] = [])  {
        return new Rule(name, this.adapter(name), args);
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
            const { method, parameters } = ParametersExpression.parse(ruleDefinition);

            ruleSet.set(method, this.make(method, parameters));
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
}
