import Form from "./Form";
import Rule from "./Rule";
import RuleSet from "./RuleSet";
import Validator from "./Validator";
import { rules } from "./decorator";
export { Form, RuleSet, Rule, Validator, rules };
export declare const plasma: {
    dependencies: (typeof Validator)[];
    bootstrapper: (validator: Validator) => void;
};
