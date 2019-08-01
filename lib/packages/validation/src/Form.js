"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const immutable_1 = __importDefault(require("immutable"));
const EVENT_WILL_CHANGE = 'form.value.change.will';
const EVENT_DID_CHANGE = 'form.value.change.did';
/**
 * Form is a stateful validation entity.
 *
 * It can contains the data inside it.
 * It can assign, serialize, reset data.
 *
 * Form and RuleSetMap will work closely to each other.
 *
 * Our design intent is to make this form work well in the client-side.
 *
 * We'll use the power of Immutable to control the state.
 *
 */
class Form {
    /**
     *
     * @param rulesMap
     * @param defaultState
     * @param autoCommit
     */
    constructor(rulesMap, defaultState = {}, autoCommit = true) {
        this.rulesMap = rulesMap;
        this.defaultState = defaultState;
        /**
         * The result of validation each time we commit
         */
        this.validity = {};
        /**
         * Event for managing the for update life-cycle
         */
        this.event = new events_1.EventEmitter();
        /**
         * Flag for controlling the auto commit behavior
         *
         */
        this.auto = false;
        this.dataState = immutable_1.default.Map(defaultState);
        this.dirtyDataState = this.dataState;
        this.updatePromise = Promise.resolve(defaultState);
        this.auto = autoCommit;
    }
    /**
     * Assign to the form with a given payload.
     *
     * After this, the form will become "dirty"
     *
     * @param payload
     */
    assign(payload) {
        this.dirtyDataState = this.dirtyDataState.merge(payload);
        // Commit the changes if the autocommit
        // flag was turned on
        if (this.auto) {
            this.commit();
        }
        return this;
    }
    /**
     * Alias of assign
     *
     * @param payload
     */
    setState(payload) {
        this.assign(payload);
        return this;
    }
    /**
     * Commit the changes
     */
    commit() {
        if (this.dataState.equals(this.dirtyDataState)) {
            return this.updatePromise;
        }
        const newState = this.dirtyDataState.toJS();
        this.event.emit(EVENT_WILL_CHANGE, newState, this);
        this.updatePromise = this.rulesMap
            .validate(this.dirtyDataState.toJS())
            .then(result => {
            this.validity = result;
            this.dataState = this.dirtyDataState;
            this.event.emit(EVENT_DID_CHANGE, newState, this);
        });
        return this.updatePromise;
    }
    /**
     * Determine if this form is dirty.
     */
    dirty() {
        return this.dataState !== this.dirtyDataState;
    }
    /**
     * Determine if this form is clean.
     */
    clean() {
        return this.dataState === this.dirtyDataState;
    }
    /**
     * Set/Get the autocommit flag
     *
     * @param flag
     */
    autoCommit(flag) {
        if (flag !== undefined) {
            this.auto = flag;
        }
        return this.auto;
    }
    /**
     * Perform a reset
     *
     */
    reset() {
        this.event.emit(EVENT_WILL_CHANGE, this.defaultState);
        this.dataState = immutable_1.default.Map(this.defaultState);
        this.dirtyDataState = this.dataState;
        this.updatePromise = Promise.resolve(this.defaultState);
        this.validity = {};
        this.event.emit(EVENT_DID_CHANGE, this.defaultState);
    }
    /**
     * Get the rules applied for this form
     *
     */
    rules() {
        return this.rulesMap;
    }
    /**
     * Hook before form state change
     *
     * @param listener
     */
    willChange(listener) {
        this.event.on(EVENT_WILL_CHANGE, listener);
        return this;
    }
    /**
     * Hook after form state has been changed
     *
     * @param listener
     */
    didChange(listener) {
        this.event.on(EVENT_DID_CHANGE, listener);
        return this;
    }
    /**
     * Get the form validity of the current state
     *
     */
    getValidity() {
        return this.validity;
    }
    /**
     * Get the dirty state of the form.
     * By default, it will return an Immutable.Map
     *
     * @param asImmutable
     */
    getDirty(asImmutable = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return asImmutable ?
                this.dirtyDataState :
                this.dirtyDataState.toJS();
        });
    }
    /**
     * Get the state of the form.
     * By default, it will return an Immutable.Map
     *
     * @param asImmutable
     */
    getValues(asImmutable = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return asImmutable ?
                this.dataState :
                this.dataState.toJS();
        });
    }
}
exports.default = Form;
//# sourceMappingURL=Form.js.map