/**
 * This is the first step of the 2 step view pattern.
 * The first step will be rendered by the ViewFactory.
 *
 * The second step will be actual content made ViewEngine. It can be Nunjucks, HAL or even NextJS.
 *
 * @see https://martinfowler.com/eaaCatalog/twoStepView.html
 */
export default class FirstStepView {

    /**
     *
     * @param view
     * @param data
     */
    constructor(view, data) {
        this.view = view;
        this.data = data;
    }

    /**
     * Add a view variable
     *
     * @param variable
     * @param value
     * @return {FirstStepView}
     */
    with(variable, value) {
        this.data[variable] = value;

        return this;
    }

    /**
     * Get the view name
     *
     * @return {*}
     */
    getView() {
        return this.view;
    }

    /**
     * Get the view data (view variables)
     *
     * @return {*}
     */
    getData() {
        return this.data;
    }
}
