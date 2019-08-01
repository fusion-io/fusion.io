"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("./Rule"));
const RuleSet_1 = __importDefault(require("./RuleSet"));
const core_1 = require("@fusion.io/core");
const RuleSetMap_1 = __importDefault(require("./RuleSetMap"));
/**
 * Error for this layer
 */
class ValidatorError extends Error {
}
exports.ValidatorError = ValidatorError;
/**
 * Validator Manager
 */
let Validator = class Validator extends Map {
    /**
     * Create a validate function with given validator name.
     *
     * @param name
     * @param args
     * @return {function(*=): *}
     */
    make(name, args = []) {
        const validationFunction = this.get(name);
        if (!validationFunction) {
            throw new ValidatorError(`E_VALIDATOR: Validator [${name}] is not registered.`);
        }
        return new Rule_1.default(name, validationFunction, args);
    }
    /**
     * Compile a rule set by a given definition string
     * It should be like: validator1:arg1:arg2|validator2:arg1:arg2
     *
     * Ex: contains:foo|contains:bar|length:40
     *
     * @param definitionString
     */
    compile(definitionString) {
        const ruleDefinitions = definitionString.split('|');
        const ruleSet = new RuleSet_1.default();
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
    compileMap(definition) {
        const map = new RuleSetMap_1.default();
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
    register(name, validationFunction) {
        this.set(name, validationFunction);
        return this;
    }
};
Validator = __decorate([
    core_1.singleton()
], Validator);
exports.default = Validator;
//# sourceMappingURL=Validator.js.map