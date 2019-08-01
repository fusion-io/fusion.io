"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rules(rules) {
    return function classDecorator(constructor) {
        return class extends constructor {
            rules() {
                return rules;
            }
        };
    };
}
exports.rules = rules;
//# sourceMappingURL=decorator.js.map