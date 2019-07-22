export default class Macro {

    constructor() {
        this.macros = {};
    }

    /**
     *
     * @param macro
     * @param parameters
     * @return {*}
     */
    execute(macro, ...parameters) {
        return this.getMacro(macro)(...parameters);
    }

    /**
     *
     * @param macro
     * @return {*}
     */
    getMacro(macro) {
        const executer = this.macros[macro];

        if (!executer) {
            throw new Error(`E_MACRO: Macro [${macro}] is not registered.`);
        }

        return executer;
    }

    /**
     *
     * @param macro
     * @param handlerFunction
     * @return {Macro}
     */
    macro(macro, handlerFunction) {
        this.macros[macro] = handlerFunction;

        return this;
    }
}
