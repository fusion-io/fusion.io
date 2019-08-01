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
 * A rule set, a chain of rules the will be applied to validate a value
 */
class RuleSet extends Map {
    /**
     * Validate a value
     *
     * @param value
     */
    validate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = Array.from(this.entries());
            const result = yield Promise.all(entries.map(([name, rule]) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    rule: rule.getName(),
                    args: rule.getArguments(),
                    valid: yield rule.validate(value)
                });
            })));
            const valids = result.filter(({ rule, valid }) => valid).map(valided => valided.rule);
            const invalids = result.filter(({ rule, valid }) => !valid).map(invalided => invalided.rule);
            return { value, valid: invalids.length === 0, valids, invalids, rules: result };
        });
    }
    /**
     * Serialize this rule into the Definition string.
     */
    serialize() {
        return Array.from(this.values())
            .map(rule => {
            const argumentsDefinitionString = rule.getArguments().length ? rule.getArguments().join(':') : '';
            return rule.getName() +
                (rule.getArguments().length ? (`:` + argumentsDefinitionString) : '');
        }).join('|');
    }
    /**
     * Alias of serialize()
     *
     */
    toString() {
        return this.serialize();
    }
    /**
     * Alias of serialize()
     *
     */
    strigify() {
        return this.serialize();
    }
}
exports.default = RuleSet;
//# sourceMappingURL=RuleSet.js.map