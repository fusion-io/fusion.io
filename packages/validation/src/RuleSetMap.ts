import RuleSet, {RuleSetValidationResult} from "./RuleSet";
import {EventEmitter} from "events";

/**
 * The result shape after we call .validate()
 */
export type RuleSetMapValidationResult = {
    [fieldName: string]: RuleSetValidationResult
}

/**
 * The Map definition. Just a Simple POJO
 */
export type RuleSetMapDefinition = {
    [fieldName: string]: string
}

/**
 * Error for this layer
 */
export class ValidationError extends Error { }

/**
 * Listener of will validate
 */
export type WillValidateListener = (willBeValidatedData: any, possibleFieldName?: string) => void;

/**
 * Listener of did validate
 */
export type DidValidateListener = (validationResult: RuleSetMapValidationResult|RuleSetValidationResult, hadBeenValidatedData: any, possibleFieldName?: string) => void;


const EVENT_WILL_VALIDATE_GENERIC        = 'validate.generic.will';
const EVENT_WILL_VALIDATE_ALL            = 'validate.all.will';
const EVENT_WILL_VALIDATE_FIELD          = 'validate.field.will';
const EVENT_WILL_VALIDATE_FIELD_SPECIFIC = 'validate.specific.will';

const EVENT_DID_VALIDATE_GENERIC         = 'validate.generic.did';
const EVENT_DID_VALIDATE_ALL             = 'validate.all.did';
const EVENT_DID_VALIDATE_FIELD           = 'validate.field.did';
const EVENT_DID_VALIDATE_FIELD_SPECIFIC  = 'validate.specific.did';


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

    private event: EventEmitter = new EventEmitter();

    /**
     * Validate a HashMap - like data.
     * We'll consider each key of the hash was a field.
     *
     * @param data
     */
    public async validate(data: any) {

        this.event.emit(EVENT_WILL_VALIDATE_GENERIC, data);
        this.event.emit(EVENT_WILL_VALIDATE_ALL, data);

        const result: RuleSetMapValidationResult = {};
        const validationPromises: Promise<RuleSetValidationResult>[] = [];


        this.forEach((ruleSet, fieldName) => {

            // Examines the field data. Here we'll accept
            // undefined. Such value can be used for required|existence validation
            const fieldData = data[fieldName];

            this.event.emit(EVENT_WILL_VALIDATE_GENERIC, fieldData, fieldName);
            this.event.emit(EVENT_WILL_VALIDATE_FIELD, fieldData, fieldName);
            this.event.emit(EVENT_WILL_VALIDATE_FIELD_SPECIFIC + '.' + fieldName, fieldData, fieldName);

            // Run the validation as a promise
            const ruleSetPromise = ruleSet
                .validate(data[fieldName])
                .then(fieldResult => {

                    this.event.emit(EVENT_DID_VALIDATE_FIELD_SPECIFIC + '.' + fieldName, fieldResult, fieldData, fieldName);
                    this.event.emit(EVENT_DID_VALIDATE_FIELD, fieldResult, fieldData, fieldName);
                    this.event.emit(EVENT_DID_VALIDATE_GENERIC, fieldResult, fieldData, fieldName);

                    result[fieldName] = fieldResult;
                    return fieldResult;
                })
            ;

            // Push current validation into the list
            validationPromises.push(ruleSetPromise);
        });

        // We'll wait for the list finished. Then we can reduce the result
        return await Promise.all(validationPromises).then(() => {
            this.event.emit(EVENT_DID_VALIDATE_ALL, result, data);
            this.event.emit(EVENT_DID_VALIDATE_GENERIC, result, data);

            return result;
        });
    }

    /**
     * Validate by a field with a given result.
     *
     * @param field
     * @param value
     */
    public async validateField(field: string, value: any) {
        const ruleSet = this.get(field);

        if (!ruleSet) {
            throw new ValidationError(`No RuleSet was defined for the field [${field}]`);
        }

        return await ruleSet.validate(value);
    }

    /**
     * Hook on before validation step.
     * This listener will be triggered on both case:
     *  - This RuleSetMap
     *  - Each RuleSet
     *
     * @param listener
     */
    public willValidate(listener: WillValidateListener) {
        this.event.on(EVENT_WILL_VALIDATE_GENERIC, listener);
        return this;
    }

    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    public willValidateAll(listener: WillValidateListener) {
        this.event.on(EVENT_WILL_VALIDATE_ALL, listener);
        return this;
    }

    /**
     * Listen on RuleSet only
     *
     * @param listener
     */
    public willValidateAField(listener: WillValidateListener) {
        this.event.on(EVENT_WILL_VALIDATE_FIELD, listener);
        return this;
    }

    /**
     * Listen on a specific RuleSet(s) by its given name
     *
     * @param fieldName
     * @param listener
     */
    public willValidateTheField(fieldName: string|string[], listener: WillValidateListener) {
        if ('string' === typeof fieldName) {
            fieldName = [fieldName];
        }

        fieldName.forEach(name => {
            this.event.on(EVENT_WILL_VALIDATE_FIELD_SPECIFIC + '.' + name, listener);
        });

        return this;
    }

    /**
     * Listen on a specific RuleSet(s) by its given name
     *
     * @param fieldName
     * @param listener
     */
    public didValidateTheField(fieldName: string|string[], listener: DidValidateListener) {
        if ('string' === typeof fieldName) {
            fieldName = [fieldName];
        }

        fieldName.forEach(name => {
            this.event.on(EVENT_DID_VALIDATE_FIELD_SPECIFIC + '.' + name, listener);
        });

        return this;
    }

    /**
     * Listen on RuleSet only
     *
     * @param listener
     */
    public didValidateAField(listener: DidValidateListener) {
        this.event.on(EVENT_DID_VALIDATE_FIELD, listener);
        return this;
    }

    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    public didValidateAll(listener: DidValidateListener) {
        this.event.on(EVENT_DID_VALIDATE_ALL, listener);
        return this;
    }

    /**
     * Hook on before validation step.
     * This listener will be triggered on both case:
     *  - This RuleSetMap
     *  - Each RuleSet
     *
     * @param listener
     */
    public didValidate(listener: DidValidateListener) {
        this.event.on(EVENT_DID_VALIDATE_GENERIC, listener);
        return this;
    }
}
