import FirstStepView from "./FirstStepView";

/**
 * The "Front" View service for making the first step view.
 */
export default class ViewFactory {

    constructor() {
        this.makingProcedures = {};
        this.madeProcedures   = {};
    }

    /**
     * Make a view
     *
     * @param viewName
     * @param viewData
     * @return {Promise<FirstStepView>}
     */
    async render(viewName, viewData = {}) {

        await this.invokeProcedures(this.getMakingProcedures(viewName), viewData, viewName);

        let firstStepView = new FirstStepView(viewName, viewData);

        await this.invokeProcedures(this.getMadeProcedures(viewName), firstStepView);

        return firstStepView;
    }

    /**
     * Register a making procedure hook
     *
     * @param viewName
     * @param callback
     * @return {ViewFactory}
     */
    making(viewName, callback) {

        if (!this.makingProcedures[viewName]) {
            this.makingProcedures[viewName] = [];
        }

        this.makingProcedures[viewName].push(callback);

        return this;
    }

    /**
     * Register a made procedure hook
     *
     * @param viewName
     * @param callback
     * @return {ViewFactory}
     */
    rendering(viewName, callback) {

        if (!this.madeProcedures[viewName]) {
            this.madeProcedures[viewName] = [];
        }

        this.madeProcedures[viewName].push(callback);

        return this;
    }

    /**
     *
     * @param viewName
     * @return {*}
     */
    getMakingProcedures(viewName) {
        if (!this.makingProcedures[viewName]) {
            return [];
        }

        return this.makingProcedures[viewName];
    }

    /**
     *
     * @param viewName
     * @return {*}
     */
    getMadeProcedures(viewName) {
        if (!this.madeProcedures[viewName]) {
            return [];
        }

        return this.madeProcedures[viewName];
    }

    /**
     *
     * @param procedures
     * @param parameters
     * @return {Promise<void>}
     */
    async invokeProcedures(procedures, ...parameters) {
        for (let index = 0; index < procedures.length; index++) {
            await procedures[index](...parameters)
        }
    }
}
