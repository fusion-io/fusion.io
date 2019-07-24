import RuleSetMap, {RuleSetMapValidationResult} from "./RuleSetMap";
import {EventEmitter} from "events";
import Immutable from "immutable";

const EVENT_WILL_CHANGE = 'form.value.change.will';
const EVENT_DID_CHANGE  = 'form.value.change.did';

export type StateChangeListener = (newState: any) => void;


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
export default class Form {

    /**
     * The actual data state of this Form
     */
    private dataState: Immutable.Map<string, any>;

    /**
     * The data state that will be committed/replace the actual data state to the Form.
     */
    private dirtyDataState: Immutable.Map<string, any>;

    /**
     * The result of validation each time we commit
     */
    private validity:RuleSetMapValidationResult = { };

    /**
     * The promise that telling if the form is updating its state
     */
    private updatePromise: Promise<void>;

    /**
     * Event for managing the for update life-cycle
     */
    private event: EventEmitter = new EventEmitter();

    /**
     * Flag for controlling the auto commit behavior
     *
     */
    private auto:boolean = false;

    /**
     *
     * @param rulesMap
     * @param defaultState
     * @param autoCommit
     */
    constructor(private rulesMap: RuleSetMap, private defaultState: any = { }, autoCommit: boolean = true) {
        this.dataState      = Immutable.Map<string, any>(defaultState);
        this.dirtyDataState = this.dataState;
        this.updatePromise  = Promise.resolve(defaultState);
        this.auto           = autoCommit;
    }

    /**
     * Assign to the form with a given payload.
     *
     * After this, the form will become "dirty"
     *
     * @param payload
     */
    assign(payload: any) {

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
    setState(payload: any) {
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

                this.validity  = result;
                this.dataState = this.dirtyDataState;

                this.event.emit(EVENT_DID_CHANGE, newState, this);
            })
        ;

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
    autoCommit(flag?: boolean) {

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

        this.dataState      = Immutable.Map<string, any>(this.defaultState);
        this.dirtyDataState = this.dataState;
        this.updatePromise  = Promise.resolve(this.defaultState);
        this.validity       = { };

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
    willChange(listener: StateChangeListener) {
        this.event.on(EVENT_WILL_CHANGE, listener);
        return this;
    }

    /**
     * Hook after form state has been changed
     *
     * @param listener
     */
    didChange(listener: StateChangeListener) {
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
    async getDirty(asImmutable = true) {
        return asImmutable ?
            this.dirtyDataState :
            this.dirtyDataState.toJS()
        ;
    }

    /**
     * Get the state of the form.
     * By default, it will return an Immutable.Map
     *
     * @param asImmutable
     */
    async getValues(asImmutable = true) {
        return asImmutable ?
            this.dataState :
            this.dataState.toJS()
        ;
    }
}
