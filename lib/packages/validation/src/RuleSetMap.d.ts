import RuleSet, { RuleSetValidationResult } from "./RuleSet";
/**
 * The result shape after we call .validate()
 */
export declare type RuleSetMapValidationResult = {
    [fieldName: string]: RuleSetValidationResult;
};
/**
 * The Map definition. Just a Simple POJO
 */
export declare type RuleSetMapDefinition = {
    [fieldName: string]: string;
};
/**
 * Error for this layer
 */
export declare class ValidationError extends Error {
}
/**
 * Listener of will validate
 */
export declare type WillValidateListener = (willBeValidatedData: any, possibleFieldName?: string) => void;
/**
 * Listener of did validate
 */
export declare type DidValidateListener = (validationResult: RuleSetMapValidationResult | RuleSetValidationResult, hadBeenValidatedData: any, possibleFieldName?: string) => void;
/**
 * Represent to form-like rule set.
 * It will be useful even for client - side implementation.
 *
 * We did on our purpose that this rule map will not
 * decide about the validity state for itself.
 *
 * It will just returns the validity states of each
 * field - RuleSet.
 *
 */
export default class RuleSetMap extends Map<string, RuleSet> {
    private event;
    /**
     * Validate a HashMap - like data.
     * We'll consider each key of the hash was a field.
     *
     * @param data
     */
    validate(data: any): Promise<RuleSetMapValidationResult>;
    /**
     * Validate by a field with a given result.
     *
     * @param field
     * @param value
     */
    validateField(field: string, value: any): Promise<RuleSetValidationResult>;
    /**
     * Serialize this Map into a POJO. It will helpful when we
     * work with transportation layer, such as QUEUE, JSON response.
     *
     */
    serialize(): RuleSetMapDefinition;
    /**
     * Alias of serialize
     */
    toJSON(): RuleSetMapDefinition;
    /**
     * Hook on before validation step.
     * This listener will be triggered on both case:
     *  - This RuleSetMap
     *  - Each RuleSet
     *
     * @param listener
     */
    willValidate(listener: WillValidateListener): this;
    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    willValidateAll(listener: WillValidateListener): this;
    /**
     * Listen on RuleSet only
     *
     * @param listener
     */
    willValidateAField(listener: WillValidateListener): this;
    /**
     * Listen on a specific RuleSet(s) by its given name
     *
     * @param fieldName
     * @param listener
     */
    willValidateTheField(fieldName: string | string[], listener: WillValidateListener): this;
    /**
     * Listen on a specific RuleSet(s) by its given name
     *
     * @param fieldName
     * @param listener
     */
    didValidateTheField(fieldName: string | string[], listener: DidValidateListener): this;
    /**
     * Listen on RuleSet only
     *
     * @param listener
     */
    didValidateAField(listener: DidValidateListener): this;
    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    didValidateAll(listener: DidValidateListener): this;
    /**
     * Hook on before validation step.
     * This listener will be triggered on both case:
     *  - This RuleSetMap
     *  - Each RuleSet
     *
     * @param listener
     */
    didValidate(listener: DidValidateListener): this;
}
