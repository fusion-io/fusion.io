import lodash from "lodash";
import RuleSet from "./RuleSet";
import ValidationResult from "./ValidationResult";

/**
 * Representing a Form. We can assign data an validation rules on it.
 * Then we can validate its data.
 */
export default class Form extends Map {

    /**
     * Assign the form value.
     *
     * @param value
     */
    assign(value) {
        lodash.forIn(value, (v, k) => {
            this.set(k, v);
        });

        return this;
    }

    /**
     * Define the form validation rules
     *
     */
    rules() {
        throw new Error("Sub class must implement the rules() method or using @form(rules) decorator");
    }

    /**
     * Validate the form
     *
     * @return {Promise<ValidationResult>}
     */
    validate() {
        let validationPromises = [ ];
        let rawResult          = { };

        lodash.forIn(this.rules(), (rulesDefinition, field) => {

            const ruleSet         = RuleSet.compile(rulesDefinition);
            const fieldValidation = ruleSet
                .validate(this.get(field))
                .then(result => rawResult[field] = {name: field, ...result})
            ;

            validationPromises.push(fieldValidation);
        });

        return Promise.all(validationPromises).then(() => new ValidationResult(rawResult));
    }

    /**
     * Get the form value
     */
    value() {
        let formValue = { };

        this.forEach((value, key) => formValue[key] = value);

        return formValue;
    }

    /**
     * Reset the form
     *
     * @return {Form}
     */
    reset() {
        this.clear();
        this.result = { };

        return this;
    }
}
