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
const events_1 = require("events");
/**
 * Error for this layer
 */
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
const EVENT_WILL_VALIDATE_GENERIC = 'validate.generic.will';
const EVENT_WILL_VALIDATE_ALL = 'validate.all.will';
const EVENT_WILL_VALIDATE_FIELD = 'validate.field.will';
const EVENT_WILL_VALIDATE_FIELD_SPECIFIC = 'validate.specific.will';
const EVENT_DID_VALIDATE_GENERIC = 'validate.generic.did';
const EVENT_DID_VALIDATE_ALL = 'validate.all.did';
const EVENT_DID_VALIDATE_FIELD = 'validate.field.did';
const EVENT_DID_VALIDATE_FIELD_SPECIFIC = 'validate.specific.did';
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
class RuleSetMap extends Map {
    constructor() {
        super(...arguments);
        this.event = new events_1.EventEmitter();
    }
    /**
     * Validate a HashMap - like data.
     * We'll consider each key of the hash was a field.
     *
     * @param data
     */
    validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.event.emit(EVENT_WILL_VALIDATE_GENERIC, data);
            this.event.emit(EVENT_WILL_VALIDATE_ALL, data);
            const result = {};
            const validationPromises = [];
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
                });
                // Push current validation into the list
                validationPromises.push(ruleSetPromise);
            });
            // We'll wait for the list finished. Then we can reduce the result
            return yield Promise.all(validationPromises).then(() => {
                this.event.emit(EVENT_DID_VALIDATE_ALL, result, data);
                this.event.emit(EVENT_DID_VALIDATE_GENERIC, result, data);
                return result;
            });
        });
    }
    /**
     * Validate by a field with a given result.
     *
     * @param field
     * @param value
     */
    validateField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ruleSet = this.get(field);
            if (!ruleSet) {
                throw new ValidationError(`No RuleSet was defined for the field [${field}]`);
            }
            return yield ruleSet.validate(value);
        });
    }
    /**
     * Serialize this Map into a POJO. It will helpful when we
     * work with transportation layer, such as QUEUE, JSON response.
     *
     */
    serialize() {
        const serialized = {};
        this.forEach((ruleSet, key) => {
            serialized[key] = ruleSet.serialize();
        });
        return serialized;
    }
    /**
     * Alias of serialize
     */
    toJSON() {
        return this.serialize();
    }
    /**
     * Hook on before validation step.
     * This listener will be triggered on both case:
     *  - This RuleSetMap
     *  - Each RuleSet
     *
     * @param listener
     */
    willValidate(listener) {
        this.event.on(EVENT_WILL_VALIDATE_GENERIC, listener);
        return this;
    }
    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    willValidateAll(listener) {
        this.event.on(EVENT_WILL_VALIDATE_ALL, listener);
        return this;
    }
    /**
     * Listen on RuleSet only
     *
     * @param listener
     */
    willValidateAField(listener) {
        this.event.on(EVENT_WILL_VALIDATE_FIELD, listener);
        return this;
    }
    /**
     * Listen on a specific RuleSet(s) by its given name
     *
     * @param fieldName
     * @param listener
     */
    willValidateTheField(fieldName, listener) {
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
    didValidateTheField(fieldName, listener) {
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
    didValidateAField(listener) {
        this.event.on(EVENT_DID_VALIDATE_FIELD, listener);
        return this;
    }
    /**
     * Listen on this RuleSetMap only
     *
     * @param listener
     */
    didValidateAll(listener) {
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
    didValidate(listener) {
        this.event.on(EVENT_DID_VALIDATE_GENERIC, listener);
        return this;
    }
}
exports.default = RuleSetMap;
//# sourceMappingURL=RuleSetMap.js.map