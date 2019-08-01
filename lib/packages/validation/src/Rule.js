"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A rule that can validate the data
 */
class Rule {
    /**
     *
     * @param name
     * @param validationFunction
     * @param ruleArguments
     */
    constructor(name, validationFunction, ruleArguments) {
        this.name = name;
        this.validationFunction = validationFunction;
        this.ruleArguments = ruleArguments;
    }
    /**
     * Get the rule name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the rule arguments
     */
    getArguments() {
        return this.ruleArguments;
    }
    /**
     *
     * @param value
     */
    validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.validationFunction(value, ...this.ruleArguments);
        });
    }
    /**
     *
     */
    toJSON() {
        return {
            name: this.name,
            arguments: this.ruleArguments
        };
    }
}
exports.default = Rule;
//# sourceMappingURL=Rule.js.map