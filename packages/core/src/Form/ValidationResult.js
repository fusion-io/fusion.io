import lodash from "lodash";
import {container} from "@fusion.io/container";
import {I18N} from "../Contracts";

export default class ValidationResult {

    /**
     *
     * @param rawResult
     */
    constructor(rawResult) {
        this.rawResult = rawResult;
    }

    /**
     *
     * @return {*}
     */
    toJson() {
        return this.rawResult;
    }

    /**
     * Tell if the form is valid.
     * If field is specified, tell if that field is valid.
     *
     * @param field
     * @return {*}
     */
    valid(field = null) {
        if (field) {
            return this.fieldValid(field);
        }

        return lodash.values(this.rawResult).filter(result => !result.valid).length === 0;
    }

    /**
     * Tell if the field is valid.
     *
     * @param field
     * @return {*}
     */
    fieldValid(field) {
        return lodash.get(this.rawResult, `${field}.valid`, true);
    }

    /**
     * Tell if the form is invalid.
     * If field is specified, tell if that field is invalid.
     *
     * @param field
     * @return {boolean}
     */
    invalid(field = null) {
        return !this.valid(field);
    }

    /**
     * Tell if the field is invalid.
     *
     * @param field
     * @return {boolean}
     */
    fieldInvalid(field) {
        return !this.fieldValid(field);
    }

    /**
     * Get the form values.
     * If the field is specified, get that field's value.
     *
     * @param field
     * @return {*}
     */
    value(field = null) {
        if (field) {
            return lodash.get(this.rawResult, `${field}.value`, undefined);
        }

        return lodash.mapValues(this.rawResult, field => field.value);
    }

    /**
     * Get rules that a given field is valid
     *
     * @param field
     */
    valids(field) {
        return lodash.get(this.rawResult, `${field}.valids`, []);
    }

    /**
     * Get rules that a given field is invalid
     *
     * @param field
     */
    invalids(field) {
        return lodash.get(this.rawResult, `${field}.invalids`, []);
    }

    /**
     * Get the invalid reasons of the form
     */
    reasons() {
        return lodash.values(this.rawResult)
            .filter(field => !field.valid)
            .map(field => ({field: field.name, value: field.value, reasons: field.rules.filter(rule => !rule.valid)}))
        ;
    }

    /**
     * Alias of toJSON()
     *
     * @return {*}
     */
    serialize() {
        return this.toJson();
    }

    /**
     * Try to translate the error with messages
     */
    translate() {

        const i18n = container.make(I18N);

        return this.reasons().map(({field, value, reasons}) => {
            const reasonsWithMessages = reasons
                .map(reason => ({
                    ...reason,
                    message: i18n.t(`validation.${reason.validator}`, {field, value, args: reason.args})
                }));

            return {field, value, reasons: reasonsWithMessages}
        });
    }
}
