import RuleSetMap, { RuleSetMapValidationResult } from "./RuleSetMap";
export declare type StateChangeListener = (newState: any) => void;
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
    private rulesMap;
    private defaultState;
    /**
     * The actual data state of this Form
     */
    private dataState;
    /**
     * The data state that will be committed/replace the actual data state to the Form.
     */
    private dirtyDataState;
    /**
     * The result of validation each time we commit
     */
    private validity;
    /**
     * The promise that telling if the form is updating its state
     */
    private updatePromise;
    /**
     * Event for managing the for update life-cycle
     */
    private event;
    /**
     * Flag for controlling the auto commit behavior
     *
     */
    private auto;
    /**
     *
     * @param rulesMap
     * @param defaultState
     * @param autoCommit
     */
    constructor(rulesMap: RuleSetMap, defaultState?: any, autoCommit?: boolean);
    /**
     * Assign to the form with a given payload.
     *
     * After this, the form will become "dirty"
     *
     * @param payload
     */
    assign(payload: any): this;
    /**
     * Alias of assign
     *
     * @param payload
     */
    setState(payload: any): this;
    /**
     * Commit the changes
     */
    commit(): Promise<void>;
    /**
     * Determine if this form is dirty.
     */
    dirty(): boolean;
    /**
     * Determine if this form is clean.
     */
    clean(): boolean;
    /**
     * Set/Get the autocommit flag
     *
     * @param flag
     */
    autoCommit(flag?: boolean): boolean;
    /**
     * Perform a reset
     *
     */
    reset(): void;
    /**
     * Get the rules applied for this form
     *
     */
    rules(): RuleSetMap;
    /**
     * Hook before form state change
     *
     * @param listener
     */
    willChange(listener: StateChangeListener): this;
    /**
     * Hook after form state has been changed
     *
     * @param listener
     */
    didChange(listener: StateChangeListener): this;
    /**
     * Get the form validity of the current state
     *
     */
    getValidity(): RuleSetMapValidationResult;
    /**
     * Get the dirty state of the form.
     * By default, it will return an Immutable.Map
     *
     * @param asImmutable
     */
    getDirty(asImmutable?: boolean): Promise<Object>;
    /**
     * Get the state of the form.
     * By default, it will return an Immutable.Map
     *
     * @param asImmutable
     */
    getValues(asImmutable?: boolean): Promise<Object>;
}
